import Fuse from "fuse.js";
import { Logger } from "../../common/Logger/Logger";
import { Searchable } from "./Searchable";
import { SearchEngineRescanError } from "./SearchEngineRescanError";
import { SearchEngineSettings } from "../../common/SearchEngineSettings";
import { SearchPlugin } from "../Plugins/SearchPlugin";
import { SearchResultItem } from "../../common/SearchResult/SearchResultItem";

export class SearchEngine {
    private initialized = false;
    private rescanPromise?: Promise<void[]>;
    private scheduledRescanTimeout?: number | NodeJS.Timeout;

    constructor(
        private settings: SearchEngineSettings,
        private readonly searchPlugins: SearchPlugin<unknown>[],
        private readonly logger: Logger
    ) {}

    public async initialize(): Promise<void> {
        await this.createPluginTempFolders();
        await this.createPluginSettingFilesIfNecessary();
        await this.rescan();
        this.initialized = true;
    }

    public isInitialized(): boolean {
        return this.initialized;
    }

    public search(searchTerm: string): SearchResultItem[] {
        if (!this.initialized || searchTerm.trim().length === 0) {
            return [];
        }

        return new Fuse(
            this.getAllSearchables().map((searchable) => searchable.toSearchResultItem()),
            { threshold: this.settings.threshold, keys: ["name"] }
        )
            .search(searchTerm)
            .map((fuseSearchResult) => fuseSearchResult.item);
    }

    public async rescan(): Promise<void> {
        if (this.rescanIsCurrentlyRunning()) {
            throw new SearchEngineRescanError("Rescan is currently running.");
        }

        this.logger.info("Starting rescan");

        try {
            this.rescanPromise = Promise.all(this.searchPlugins.map((searchPlugin) => searchPlugin.rescan()));
            await this.rescanPromise;
            this.logger.info(`Sucessfully rescanned`);
        } catch (error) {
            this.handleError(new SearchEngineRescanError(error));
        } finally {
            this.rescanPromise = undefined;
            if (this.settings.automaticRescanIntervalInSeconds) {
                this.scheduleRescan(this.settings.automaticRescanIntervalInSeconds);
            }
        }
    }

    public rescanIsCurrentlyRunning(): boolean {
        return this.rescanPromise !== undefined;
    }

    public cancelScheduledRescan(): void {
        if (this.scheduledRescanTimeout) {
            clearTimeout(this.scheduledRescanTimeout as number);
            this.logger.info("Scheduled rescan cancelled");
        }
    }

    public hasRescanScheduled(): boolean {
        return this.scheduledRescanTimeout !== undefined;
    }

    public async clearCaches(): Promise<void> {
        try {
            await Promise.all(this.searchPlugins.map((searchPlugin) => searchPlugin.clearCache()));
        } catch (error) {
            throw new Error(`SearchEngine failed to clear caches. Reason: ${error}`);
        }
    }

    public updateSettings(updatedSettings: SearchEngineSettings): void {
        if (
            SearchEngine.rescanOptionChanged(
                updatedSettings.automaticRescanIntervalInSeconds,
                this.settings.automaticRescanIntervalInSeconds
            )
        ) {
            if (updatedSettings.automaticRescanIntervalInSeconds) {
                this.rescan();
            } else {
                this.cancelScheduledRescan();
            }
        }

        this.settings = updatedSettings;
    }

    private scheduleRescan(automaticRescanIntervalInSeconds: number): void {
        this.logger.info(`Scheduled next rescan in ${automaticRescanIntervalInSeconds} seconds`);
        this.scheduledRescanTimeout = setTimeout(() => this.rescan(), automaticRescanIntervalInSeconds * 1000);
    }

    private async createPluginTempFolders(): Promise<void> {
        await Promise.all(this.searchPlugins.map((searchPlugin) => searchPlugin.createTemporaryFolder()));
    }

    private async createPluginSettingFilesIfNecessary(): Promise<void> {
        await Promise.all(this.searchPlugins.map((searchPlugin) => searchPlugin.createSettingsFileIfNotExists()));
    }

    private getAllSearchables(): Searchable[] {
        return this.searchPlugins
            .map((searchPlugin) => searchPlugin.getAllSearchables())
            .reduce((previous, current) => previous.concat(current), []);
    }

    private handleError(error: Error): void {
        this.logger.error(`Handled error: ${error.message}`);
    }

    private static rescanOptionChanged(newValue: number, currentValue: number): boolean {
        return newValue !== currentValue;
    }
}
