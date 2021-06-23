<template>
    <div>
        Search Engine Settings
        <div>
            {{ settings }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IpcChannel } from "../../../common/IpcChannel";
import { Settings } from "../../../common/Settings";
import { SearchEngineSettings } from "../../../common/SearchEngineSettings";

interface Data {
    settings: SearchEngineSettings;
}

export default defineComponent({
    data(): Data {
        return {
            settings: this.Bridge.ipcRenderer.sendSync<unknown, Settings>(IpcChannel.GetSettings).searchEngineSettings,
        };
    },
});
</script>
