<template>
    <div class="settings">
        <div class="sidebar-container">
            <Sidebar />
        </div>
        <div class="body-container">
            <router-view> </router-view>
        </div>
        <div class="notification-container">
            <Notifications />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "./Components/SettingsWindow/Sidebar.vue";
import Notifications from "./Components/SettingsWindow/Notifications.vue";

import "ueli-designsystem/variables.css";
import "./Styles/shared.css";

export default defineComponent({
    components: {
        Sidebar,
        Notifications,
    },

    methods: {
        navigateTo(path: string): void {
            this.$router.push(path);
        },
    },
});
</script>

<style>
.settings {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
}

.sidebar-container,
.body-container {
    height: 100%;
    overflow-y: auto;
}

.sidebar-container {
    width: 220px;
    border-right: var(--ueli-border);
}

.body-container {
    width: 100%;
}

.notification-container {
    position: fixed;
    bottom: var(--ueli-spacing-4x);
    right: var(--ueli-spacing-4x);
}
</style>
