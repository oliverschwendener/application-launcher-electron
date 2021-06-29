import { createApp } from "vue";
import { VueEvent } from "./VueEvent";
import { vueEventEmitter } from "./VueEventEmitter";
import Main from "./Main.vue";

import "bootstrap-icons/font/bootstrap-icons.css";

document.addEventListener("keydown", (keyboardEvent: KeyboardEvent) =>
    vueEventEmitter.emit<KeyboardEvent>(VueEvent.GlobalKeyDown, keyboardEvent)
);

const app = createApp(Main);
app.config.globalProperties.Bridge = window.Bridge;
app.mount("#app");
