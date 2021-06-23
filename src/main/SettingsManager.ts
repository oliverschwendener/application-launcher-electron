import { Settings } from "../common/Settings";
import { FileSystemUtility } from "./Utilities/FileSystemUtility";

export class SettingsManager {
    private settings: Settings;

    public constructor(private readonly userSettingsFilePath: string, private readonly defaultSettings: Settings) {
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
            return FileSystemUtility.readJsonFileSync(this.userSettingsFilePath);
        } catch (error) {
            console.log(
                `Default settings will be applied. Failed to read user settings from settings file. Reason: ${error}`
            );
            return this.defaultSettings;
        }
    }
}
