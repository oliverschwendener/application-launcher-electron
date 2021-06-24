<template>
    <div>
        Search Engine Settings
        <div>
            {{ settings.searchEngineSettings }}
        </div>
        <button @click="change">Change</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IpcChannel } from "../../../common/IpcChannel";
import { ObjectUtility } from "../../../common/ObjectUtility";
import { Settings } from "../../../common/Settings";

interface Data {
    settings: Settings;
}

export default defineComponent({
    data(): Data {
        return {
            settings: this.Bridge.ipcRenderer.sendSync<unknown, Settings>(IpcChannel.GetSettings),
        };
    },

    methods: {
        async change(): Promise<void> {
            this.settings.searchEngineSettings.threshold =
                this.settings.searchEngineSettings.threshold === 0.4 ? 0.6 : 0.4;

            await this.saveSettings();
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
