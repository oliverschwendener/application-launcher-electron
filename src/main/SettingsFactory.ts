import { Settings } from "../common/Settings";

export class SettingsFactory {
    public static createFromUserSettings(userSettings: Record<string, unknown>, defaultSettings: Settings): Settings {
        const result = JSON.parse(JSON.stringify(defaultSettings));

        Object.keys(defaultSettings).forEach((settingKey) => {
            const allowedSubKeys = Object.keys(result[settingKey]);

            if (userSettings[settingKey]) {
                result[settingKey] = Object.assign(result[settingKey], userSettings[settingKey]);
            }

            Object.keys(result[settingKey]).forEach((key) => {
                if (!allowedSubKeys.includes(key)) {
                    delete result[settingKey][key];
                }
            });
        });

        return result;
    }
}
