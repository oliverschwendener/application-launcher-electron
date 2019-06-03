import Vue from "vue";
import { vueEventDispatcher } from "../vue-event-dispatcher";
import { VueEventChannels } from "../vue-event-channels";
import { UserConfigOptions } from "../../common/config/user-config-options";
import { cloneDeep } from "lodash";
import { join } from "path";
import { defaultGeneralOptions } from "../../common/config/default-general-options";
import { GlobalHotKeyModifier } from "../../common/global-hot-key/global-hot-key-modifier";
import { GlobalHotKeyKey } from "../../common/global-hot-key/global-hot-key-key";
import { Language } from "../../common/translation/language";
import { getFolderPath, getFilePath } from "../dialogs";
import { NotificationType } from "../../common/notification-type";
import { TranslationSet } from "../../common/translation/translation-set";
import { FileHelpers } from "../../common/helpers/file-helpers";
import { isValidUserConfig, mergeUserConfigWithDefault } from "../../common/helpers/config-helpers";
import { defaultUserConfigOptions } from "../../common/config/default-user-config-options";
import { GeneralSettings } from "./general-settings";

export const generalSettingsComponent = Vue.extend({
    data() {
        return {
            availableLanguages: Object.values(Language).map((language) => language),
            dropdownVisible: false,
            globalHotKeyKeys: Object.values(GlobalHotKeyKey).map((key) => key),
            globalHotKeyModifiers: Object.values(GlobalHotKeyModifier).map((modifier) => modifier),
            settingName: GeneralSettings.General,
            visible: false,
        };
    },
    methods: {
        clearExecutionLog() {
            vueEventDispatcher.$emit(VueEventChannels.clearExecutionLogConfirmed);
        },
        dropdownTrigger() {
            this.dropdownVisible = !this.dropdownVisible;
        },
        async exportCurrentSettings(): Promise<void> {
            try {
                const filePath: string = await getFolderPath();
                const config: UserConfigOptions = this.config;
                const translations: TranslationSet = this.translations;
                const settingsFilePath = join(filePath, "ueli.config.json");
                await FileHelpers.writeFile(settingsFilePath, JSON.stringify(config, undefined, 2));
                vueEventDispatcher.$emit(VueEventChannels.notification, translations.generalSettingsSuccessfullyExportedSettings, NotificationType.Info);

            } catch (error) {
                vueEventDispatcher.$emit(VueEventChannels.notification, error, NotificationType.Error);
            }
        },
        getTranslatedGlobalHotKeyModifier(hotkeyModifier: GlobalHotKeyModifier): string {
            const translations: TranslationSet = this.translations;
            switch (hotkeyModifier) {
                case GlobalHotKeyModifier.Alt:
                    return translations.hotkeyModifierAlt;
                case GlobalHotKeyModifier.AltGr:
                    return translations.hotkeyModifierAltGr;
                case GlobalHotKeyModifier.Command:
                    return translations.hotkeyModifierCommand;
                case GlobalHotKeyModifier.Control:
                    return translations.hotkeyModifierControl;
                case GlobalHotKeyModifier.Option:
                    return translations.hotkeyModifierOption;
                case GlobalHotKeyModifier.Shift:
                    return translations.hotkeyModifierShift;
                default:
                    return hotkeyModifier;
            }
        },
        getTranslatedGlobalHotKeyKey(hotkeyKey: GlobalHotKeyKey): string {
            const translations: TranslationSet = this.translations;
            switch (hotkeyKey) {
                case GlobalHotKeyKey.Backspace:
                    return translations.hotkeyKeyBackspace;
                case GlobalHotKeyKey.Delete:
                    return translations.hotkeyKeyDelete;
                case GlobalHotKeyKey.Down:
                    return translations.hotkeyKeyDown;
                case GlobalHotKeyKey.End:
                    return translations.hotkeyKeyEnd;
                case GlobalHotKeyKey.Escape:
                    return translations.hotkeyKeyEscape;
                case GlobalHotKeyKey.Home:
                    return translations.hotkeyKeyHome;
                case GlobalHotKeyKey.Insert:
                    return translations.hotkeyKeyInsert;
                case GlobalHotKeyKey.Left:
                    return translations.hotkeyKeyLeft;
                case GlobalHotKeyKey.PageDown:
                    return translations.hotkeyKeyPageDown;
                case GlobalHotKeyKey.PageUp:
                    return translations.hotkeyKeyPageUp;
                case GlobalHotKeyKey.Plus:
                    return translations.hotkeyKeyPlus;
                case GlobalHotKeyKey.Return:
                    return translations.hotkeyKeyReturn;
                case GlobalHotKeyKey.Right:
                    return translations.hotkeyKeyRight;
                case GlobalHotKeyKey.Space:
                    return translations.hotkeyKeySpace;
                case GlobalHotKeyKey.Tab:
                    return translations.hotkeyKeyTab;
                case GlobalHotKeyKey.Up:
                    return translations.hotkeyKeyUp;
                default:
                    return hotkeyKey;
            }
        },
        async importSettings(): Promise<void> {
            const translations: TranslationSet = this.translations;
            const filter: Electron.FileFilter = {
                extensions: ["json"],
                name: translations.generalSettingsImportFileFilterJsonFiles,
            };
            try {
                const filePath = await getFilePath([filter]);
                const fileContent = await FileHelpers.readFile(filePath);
                if (isValidUserConfig(fileContent)) {
                    const userConfig: UserConfigOptions = JSON.parse(fileContent);
                    const config: UserConfigOptions = mergeUserConfigWithDefault(userConfig, defaultUserConfigOptions);
                    this.config = config;
                    this.updateConfig();
                } else {
                    vueEventDispatcher.$emit(VueEventChannels.notification, translations.generalSettingsImportErrorInvalidConfig, NotificationType.Error);
                }

            } catch (error) {
                vueEventDispatcher.$emit(VueEventChannels.notification, error, NotificationType.Error);
            }
        },
        openDebugLog() {
            vueEventDispatcher.$emit(VueEventChannels.openDebugLogRequested);
        },
        openTempFolder() {
            vueEventDispatcher.$emit(VueEventChannels.openTempFolderRequested);
        },
        resetAll() {
            const config: UserConfigOptions = this.config;
            config.generalOptions = cloneDeep(defaultGeneralOptions);
            this.updateConfig();
        },
        resetAllSettingsToDefault() {
            this.config = cloneDeep(defaultUserConfigOptions);
            this.updateConfig();
            this.dropdownVisible = false;
        },
        updateConfig() {
            const config: UserConfigOptions = this.config;
            if (config.generalOptions.rememberWindowPosition) {
                config.generalOptions.showAlwaysOnPrimaryDisplay = false;
            }
            vueEventDispatcher.$emit(VueEventChannels.configUpdated, this.config);
        },
    },
    mounted() {
        vueEventDispatcher.$on(VueEventChannels.showSetting, (settingName: string) => {
            if (settingName === this.settingName) {
                this.visible = true;
            } else {
                this.visible = false;
            }
        });
    },
    props: ["config", "translations"],
    template: `
        <div v-if="visible">
            <div class="settings__setting-title title is-3">
                <span>
                    {{ translations.generalSettings }}
                </span>
                <div>
                    <div class="dropdown is-right" :class="{ 'is-active' : dropdownVisible}">
                        <div class="dropdown-trigger">
                            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="dropdownTrigger">
                                <span class="icon">
                                    <i class="fas fa-ellipsis-v"></i>
                                </span>
                            </button>
                        </div>
                        <div class="dropdown-menu" id="dropdown-menu" role="menu">
                            <div class="dropdown-content">
                                <a href="#" class="dropdown-item" @click="importSettings">
                                    <span class="icon"><i class="fa fa-file-import"></i></span>
                                    <span>{{ translations.generalSettingsImportSettings }}</span>
                                </a>
                                <a class="dropdown-item" @click="exportCurrentSettings">
                                    <span class="icon"><i class="fa fa-file-export"></i></span>
                                    <span>{{ translations.generalSettingsExportSettings }}</span>
                                </a>
                                <a class="dropdown-item" @click="resetAllSettingsToDefault">
                                    <span class="icon"><i class="fas fa-undo-alt"></i></span>
                                    <span>{{ translations.generalSettingsResetAllSettings }}</span>
                                </a>
                                <a class="dropdown-item" @click="clearExecutionLog">
                                    <span class="icon"><i class="fas fa-trash"></i></span>
                                    <span>{{ translations.clearExecutionLog }}</span>
                                </a>
                                <a class="dropdown-item" @click="openDebugLog">
                                    <span class="icon"><i class="fas fa-bug"></i></span>
                                    <span>{{ translations.openDebugLog }}</span>
                                </a>
                                <a class="dropdown-item" @click="openTempFolder">
                                    <span class="icon"><i class="fas fa-folder"></i></span>
                                    <span>{{ translations.openTempFolder }}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <button class="button" @click="resetAll">
                        <span class="icon">
                            <i class="fas fa-undo-alt"></i>
                        </span>
                    </button>
                </div>
            </div>
            <div class="settings__setting-content">

                <div class="box">
                    <div class="settings__options-container">

                        <div class="settings__option">
                            <div class="settings__option-name">{{ translations.generalSettingsLanguage }}</div>
                            <div class="settings__option-content">
                                <div class="field is-grouped is-grouped-right">
                                    <div class="control">
                                        <div class="select">
                                            <select v-model="config.generalOptions.language" @change="updateConfig">
                                                <option v-for="availableLanguage in availableLanguages">{{ availableLanguage }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="settings__option">
                            <div class="settings__option-name">{{ translations.generalSettingsAutostartApp }}</div>
                            <div class="settings__option-content">
                                <div class="field has-addons has-addons-right vertical-center">
                                    <div class="control">
                                        <input id="autoStartCheckbox" type="checkbox" name="autoStartCheckbox" class="switch is-rounded is-success" checked="checked" v-model="config.generalOptions.autostart" @change="updateConfig">
                                        <label for="autoStartCheckbox"></label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="settings__option">
                            <div class="settings__option-name">{{ translations.generalSettingsShowTrayIcon }}</div>
                            <div class="settings__option-content">
                                <div class="field has-addons has-addons-right vertical-center">
                                    <div class="control">
                                        <input id="showTrayIconCheckbox" type="checkbox" name="showTrayIconCheckbox" class="switch is-rounded is-success" checked="checked" v-model="config.generalOptions.showTrayIcon" @change="updateConfig">
                                        <label for="showTrayIconCheckbox"></label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="settings__option">
                            <div class="settings__option-name">{{ translations.generalSettingsClearCachesOnExit }}</div>
                            <div class="settings__option-content">
                                <div class="field has-addons has-addons-right vertical-center">
                                    <div class="control">
                                        <input id="clearCachesOnExit" type="checkbox" name="clearCachesOnExit" class="switch is-rounded is-success" checked="checked" v-model="config.generalOptions.clearCachesOnExit" @change="updateConfig">
                                        <label for="clearCachesOnExit"></label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="settings__option">
                            <div class="settings__option-name">{{ translations.generalSettingsHotKey }}</div>
                            <div class="settings__option-content">
                                <div class="field has-addons has-addons-right">
                                    <div class="control">
                                        <div class="select">
                                            <select v-model="config.generalOptions.hotKey.modifier" @change="updateConfig">
                                                <option v-for="globalHotKeyModifier in globalHotKeyModifiers" :value="globalHotKeyModifier">
                                                    {{ getTranslatedGlobalHotKeyModifier(globalHotKeyModifier) }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="control">
                                        <button class="button is-static">
                                            <span class="icon">
                                                <i class="fa fa-plus"></i>
                                            </span>
                                        </button>
                                    </div>
                                    <div class="control">
                                        <div class="select">
                                            <select v-model="config.generalOptions.hotKey.key" @change="updateConfig">
                                                <option v-for="globalHotKeyKey in globalHotKeyKeys" :value="globalHotKeyKey">
                                                    {{ getTranslatedGlobalHotKeyKey(globalHotKeyKey) }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="settings__option">
                            <div class="settings__option-name">{{ translations.generalSettingsRescanIntervalEnabled }}</div>
                            <div class="settings__option-content">
                                <div class="field is-grouped is-grouped-right">
                                    <div class="control">
                                        <input id="rescanEnabledCheckbox" type="checkbox" name="rescanEnabledCheckbox" class="switch is-rounded is-success" checked="checked" v-model="config.generalOptions.rescanEnabled" @change="updateConfig">
                                        <label for="rescanEnabledCheckbox"></label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="settings__option" v-if="config.generalOptions.rescanEnabled">
                            <div class="settings__option-name">{{ translations.generalSettingsRescanInterval }}</div>
                            <div class="settings__option-content">
                                <div class="field is-grouped is-grouped-right">
                                    <div class="control">
                                        <input class="input" type="number" min="10" v-model="config.generalOptions.rescanIntervalInSeconds" @change="updateConfig">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="settings__option">
                            <div class="settings__option-name">{{ translations.generalSettingsRememberWindowPosition }}</div>
                            <div class="settings__option-content">
                                <div class="field has-addons has-addons-right vertical-center">
                                    <div class="control">
                                        <input id="rememberWindowPositionCheckbox" type="checkbox" name="rememberWindowPositionCheckbox" class="switch is-rounded is-success" checked="checked" v-model="config.generalOptions.rememberWindowPosition" @change="updateConfig">
                                        <label for="rememberWindowPositionCheckbox"></label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="settings__option" v-if="!config.generalOptions.rememberWindowPosition">
                            <div class="settings__option-name">{{ translations.generalSettingsShowAlwaysOnPrimaryDisplay }}</div>
                            <div class="settings__option-content">
                                <div class="field has-addons has-addons-right vertical-center">
                                    <div class="control">
                                        <input id="showAlwaysOnPrimaryDisplayCheckbox" type="checkbox" name="showAlwaysOnPrimaryDisplayCheckbox" class="switch is-rounded is-success" checked="checked" v-model="config.generalOptions.showAlwaysOnPrimaryDisplay" @change="updateConfig">
                                        <label for="showAlwaysOnPrimaryDisplayCheckbox"></label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="settings__option">
                            <div class="settings__option-name">{{ translations.generalSettingsLogExecution }}</div>
                            <div class="settings__option-content">
                                <div class="field has-addons has-addons-right vertical-center">
                                    <div class="control">
                                        <input id="logExecutionCheckbox" type="checkbox" name="logExecutionCheckbox" class="switch is-rounded is-success" checked="checked" v-model="config.generalOptions.logExecution" @change="updateConfig">
                                        <label for="logExecutionCheckbox"></label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    `,
});
