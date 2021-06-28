import { App, GlobalShortcut, IpcMain, IpcMainEvent } from "electron";
import { IpcMainInvokeEvent } from "electron/main";
import { IpcChannel } from "../common/IpcChannel";
import { OperatingSystem } from "../common/OperatingSystem/OperatingSystem";
import { SearchResultItem } from "../common/SearchResult/SearchResultItem";
import { Settings } from "../common/Settings";
import { CommandlineSwitchConfiguration } from "./CommandlineSwitchConfiguration";
import { ExecutionService } from "./Core/ExecutionService";
import { LocationOpeningService } from "./Core/LocationOpeningService";
import { SearchEngine } from "./Core/SearchEngine";
import { SettingsManager } from "./SettingsManager";
import { TrayIconEvent } from "./TrayIconEvent";
import { TrayIconManager } from "./TrayIconManager";
import { UeliCommandEvent } from "./UeliCommandEvent";
import { WindowManager } from "./WindowManager";

export class MainApplication {
    constructor(
        private readonly electronApp: App,
        private readonly ipcMain: IpcMain,
        private readonly globalShortcut: GlobalShortcut,
        private readonly windowManager: WindowManager,
        private readonly trayIconManager: TrayIconManager,
        private readonly operatingSystem: OperatingSystem,
        private readonly searchEngine: SearchEngine,
        private readonly executionService: ExecutionService,
        private readonly locationOpeningService: LocationOpeningService,
        private readonly settingsManager: SettingsManager
    ) {}

    public start(): void {
        this.registerElectronAppEventListeners();
    }

    private registerElectronAppEventListeners(): void {
        this.appendCommandlineSwitches();
        this.electronApp.on("ready", () => this.startApp());
        this.electronApp.on("window-all-closed", () => this.quitApp());
    }

    private startApp(): void {
        this.registerIpcEventListeners();
        this.createTrayIcon();
        this.windowManager.createMainWindow();
        this.registerGlobalKeyEventListeners();
        this.initializeSearchEngine();
    }

    private quitApp(): void {
        this.electronApp.quit();
    }

    private appendCommandlineSwitches(): void {
        const commandlineSwitchConfigurations: CommandlineSwitchConfiguration[] = [
            {
                operatingSystem: OperatingSystem.Windows,
                commandlineSwitches: ["wm-window-animations-disabled"],
            },
        ];

        commandlineSwitchConfigurations.forEach((commandlineSwitchConfiguration) => {
            if (
                commandlineSwitchConfiguration.operatingSystem === this.operatingSystem ||
                commandlineSwitchConfiguration.operatingSystem === undefined
            ) {
                commandlineSwitchConfiguration.commandlineSwitches.forEach((commandlineSwitch) => {
                    this.electronApp.commandLine.appendSwitch(commandlineSwitch);
                });
            }
        });
    }

    private createTrayIcon(): void {
        this.trayIconManager.createTrayIcon();
    }

    private registerGlobalKeyEventListeners(): void {
        this.globalShortcut.register("Alt+Space", () => this.windowManager.toggleMainWindow());
    }

    private initializeSearchEngine(): Promise<void> {
        return this.searchEngine.initialize();
    }

    private registerIpcEventListeners(): void {
        this.ipcMain.handle(
            IpcChannel.Search,
            (event: IpcMainInvokeEvent, args: string[]): Promise<SearchResultItem[]> => {
                if (args.length === 0) {
                    return Promise.reject("Failed to handle search term. Reason: no search term specified.");
                }

                return Promise.resolve(this.searchEngine.search(args[0]));
            }
        );

        this.ipcMain.handle(
            IpcChannel.Execute,
            async (event: IpcMainInvokeEvent, args: SearchResultItem[]): Promise<void> => {
                if (args.length === 0) {
                    return Promise.reject(
                        "Failed to execute search result item. Reason: no search result items given."
                    );
                }

                this.windowManager.hideMainWindow();
                await this.executionService.execute(args[0]);
            }
        );

        this.ipcMain.handle(
            IpcChannel.OpenLocation,
            (event: IpcMainInvokeEvent, args: SearchResultItem[]): Promise<void> => {
                if (args.length === 0) {
                    return Promise.reject("Unable to open location. Reason: no search result items given.");
                }

                this.windowManager.hideMainWindow();
                return this.locationOpeningService.openLocation(args[0]);
            }
        );

        this.ipcMain.handle(IpcChannel.ClearCaches, () => this.clearCaches());

        this.ipcMain.handle(
            IpcChannel.UpdateSettings,
            (ipcMainEvent: IpcMainInvokeEvent, args: Settings[]): Promise<void> => {
                if (args.length === 0) {
                    return Promise.reject("Unable to update settings. Reason: no settings given.");
                }

                return this.updateSettings(args[0]);
            }
        );

        this.ipcMain.on(IpcChannel.EscapePressed, () => this.windowManager.hideMainWindow());

        this.ipcMain.on(IpcChannel.TrayIconEvent, (ipcMainEvent, trayIconEvent: TrayIconEvent) =>
            this.handleTrayIconEvent(trayIconEvent)
        );

        this.ipcMain.on(IpcChannel.UeliCommandEvent, (ipcMainEvent, ueliCommandEvent: UeliCommandEvent) =>
            this.handleUeliCommandEvent(ueliCommandEvent)
        );

        this.ipcMain.on(
            IpcChannel.GetSettings,
            (event: IpcMainEvent) => (event.returnValue = this.settingsManager.getSettings())
        );
    }

    private rescan(): Promise<void> {
        return this.searchEngine.rescan();
    }

    private clearCaches(): Promise<void> {
        return this.searchEngine.clearCaches();
    }

    private handleTrayIconEvent(event: TrayIconEvent): void {
        switch (event) {
            case TrayIconEvent.ShowClicked:
                this.windowManager.showMainWindow();
                break;

            case TrayIconEvent.SettingsClicked:
                this.windowManager.showSettingsWindow();
                break;

            case TrayIconEvent.QuitClicked:
                this.quitApp();
                break;

            case TrayIconEvent.RescanClicked:
                this.rescan();
                break;

            case TrayIconEvent.ClearCachesClicked:
                this.clearCaches();
                break;

            default:
                throw new Error(`Failed to handle tray icon event ${event}. Reason: no handler found.`);
        }
    }

    private handleUeliCommandEvent(event: UeliCommandEvent): void {
        switch (event) {
            case UeliCommandEvent.OpenSettings:
                this.windowManager.showSettingsWindow();
                break;

            case UeliCommandEvent.QuitApp:
                this.quitApp();
                break;

            case UeliCommandEvent.Rescan:
                this.rescan();
                break;

            default:
                throw new Error(`Failed to handle ueli command event ${event}. Reason: no handler found`);
        }
    }

    private updateSettings(updatedSettings: Settings): Promise<void> {
        this.searchEngine.updateSettings(updatedSettings.searchEngineSettings);
        return this.settingsManager.updateSettings(updatedSettings);
    }
}
