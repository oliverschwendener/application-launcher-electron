import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import Settings from "./Settings.vue";
import GeneralSettings from "./Components/SettingsWindow/GeneralSettings.vue";
import SearchEngineSettings from "./Components/SettingsWindow/SearchEngineSettings.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: GeneralSettings,
        },
        {
            path: "/general",
            component: GeneralSettings,
        },
        {
            path: "/search-engine",
            component: SearchEngineSettings,
        },
    ],
});

const app = createApp(Settings);
app.config.globalProperties.Bridge = window.Bridge;
app.use(router);
app.mount("#app");
