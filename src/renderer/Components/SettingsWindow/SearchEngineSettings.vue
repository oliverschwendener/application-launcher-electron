<template>
    <div class="search-engine-settings">
        Search Engine Settings
        <div class="settings">
            <div class="setting">
                <div class="setting-label">Fuzzyness</div>
                <div class="setting-body">
                    <RangeSlider
                        :min="0"
                        :max="1"
                        :step="0.1"
                        :value="settings.searchEngineSettings.threshold"
                        :displayValue="true"
                        @valueChanged="thresholdChanged"
                    />
                </div>
            </div>
        </div>
    </div>
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
import RangeSlider from "../DesignSystem/RangeSlider.vue";

interface Data {
    settings: Settings;
}

export default defineComponent({
    components: {
        RangeSlider,
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

        successfullySavedSettingsNotification(): NotificationData {
            return {
                message: "Settings have been updated",
                autoHide: true,
                autoHideDuration: 2500,
                type: NotificationType.Success,
                showIcon: true,
            };
        },

        failedToSaveSettingsNotification(error: any): NotificationData {
            return {
                message: `Failed to save settings. Reason ${error}`,
                autoHide: false,
                type: NotificationType.Danger,
                showIcon: true,
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
.search-engine-settings {
    padding: var(--ueli-spacing-4x);
    box-sizing: border-box;
}

.settings {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.setting {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: var(--ueli-spacing-4x);
    box-sizing: border-box;
}

.setting:not(:last-child) {
    border-bottom: var(--ueli-border);
}

.setting-label {
    flex-shrink: 0;
    padding-right: var(--ueli-spacing-4x);
}

.setting-body {
    flex-grow: 1;
}
</style>
