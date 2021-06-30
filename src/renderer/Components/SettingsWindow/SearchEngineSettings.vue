<template>
    <SettingList title="Search Engine Settings">
        <template v-slot:settings>
            <Setting class="setting">
                <template v-slot:label>Fuzzyness</template>
                <template v-slot:body>
                    <SliderInput
                        :min="0"
                        :max="1"
                        :step="0.1"
                        :value="settings.searchEngineSettings.threshold"
                        :displayValue="true"
                        @valueChanged="thresholdChanged"
                    />
                </template>
            </Setting>

            <Setting class="setting">
                <template v-slot:label> Automatic rescan interval </template>
                <template v-slot:body>
                    <NumberInput
                        :value="settings.searchEngineSettings.automaticRescanIntervalInSeconds"
                        @changed="rescanIntervalChanged"
                    />
                </template>
            </Setting>
        </template>
    </SettingList>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IpcChannel } from "../../../common/IpcChannel";
import { ObjectUtility } from "../../../common/ObjectUtility";
import { Settings } from "../../../common/Settings";
import { NotificationData } from "../../NotificationData";
import { NotificationType } from "../../NotificationType";
import { VueEvent } from "../../VueEvent";
import { vueEventEmitter } from "../../VueEventEmitter";
import { NumberInput, SliderInput, Setting, SettingList } from "ueli-designsystem";

interface Data {
    settings: Settings;
}

export default defineComponent({
    components: {
        NumberInput,
        Setting,
        SettingList,
        SliderInput,
    },

    data(): Data {
        return {
            settings: this.Bridge.ipcRenderer.sendSync<unknown, Settings>(IpcChannel.GetSettings),
        };
    },

    methods: {
        async thresholdChanged(threshold: number) {
            this.settings.searchEngineSettings.threshold = threshold;
            try {
                await this.saveSettings();
                vueEventEmitter.emit(VueEvent.Notification, this.successfullySavedSettingsNotification());
            } catch (error) {
                vueEventEmitter.emit(VueEvent.Notification, this.failedToSaveSettingsNotification(error));
            }
        },

        async rescanIntervalChanged(interval: number) {
            this.settings.searchEngineSettings.automaticRescanIntervalInSeconds = interval;
            try {
                await this.saveSettings();
                vueEventEmitter.emit(VueEvent.Notification, this.successfullySavedSettingsNotification());
            } catch (error) {
                vueEventEmitter.emit(VueEvent.Notification, this.failedToSaveSettingsNotification(error));
            }
        },

        successfullySavedSettingsNotification(): NotificationData {
            return {
                message: "Settings have been updated",
                autoHide: true,
                autoHideDuration: 2500,
                type: NotificationType.Success,
                icon: "check",
            };
        },

        failedToSaveSettingsNotification(error: Error): NotificationData {
            return {
                message: `Failed to save settings. Reason ${error.message}`,
                autoHide: false,
                type: NotificationType.Danger,
                icon: "exclamation-triangle-fill",
            };
        },

        saveSettings(): Promise<void> {
            return this.Bridge.ipcRenderer.invoke<Settings, void>(
                IpcChannel.UpdateSettings,
                ObjectUtility.clone<Settings>(this.settings)
            );
        },
    },
});
</script>

<style scoped>
.setting:not(:last-child) {
    border-bottom: var(--ueli-border);
}
</style>
