import { Logger } from "../common/Logger/Logger";
import { Settings } from "../common/Settings";
import { SettingsFactory } from "./SettingsFactory";
import { FileSystemUtility } from "./Utilities/FileSystemUtility";

export class SettingsManager {
    private settings: Settings;

    public constructor(
        private readonly userSettingsFilePath: string,
        private readonly defaultSettings: Settings,
        private readonly logger: Logger
    ) {
        if (FileSystemUtility.existsSync(this.userSettingsFilePath)) {
            this.settings = this.readSettingsFromFileSystem();
        } else {
            FileSystemUtility.writeJsonFileSync(this.defaultSettings, this.userSettingsFilePath);
            this.settings = this.defaultSettings;
        }
    }

    public getSettings(): Settings {
        return this.settings;
    }

    public updateSettings(updatedSettings: Settings): Promise<void> {
        this.settings = updatedSettings;
        return FileSystemUtility.writeJsonFile<Settings>(updatedSettings, this.userSettingsFilePath);
    }

    private readSettingsFromFileSystem(): Settings {
        try {
            return SettingsFactory.createFromUserSettings(
                FileSystemUtility.readJsonFileSync<Record<string, unknown>>(this.userSettingsFilePath),
                this.defaultSettings
            );
        } catch (error) {
            this.logger.error(
                `Default settings will be applied. Failed to read user settings from settings file. Reason: ${error}`
            );
            return this.defaultSettings;
        }
    }
}
