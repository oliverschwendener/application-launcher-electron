<template>
    <div class="notifications">
        <Notification
            v-for="(notification, index) in notifications"
            :key="index"
            :message="notification.message"
            :type="notification.type"
            :icon="notification.icon"
            @close="removeNotification(index)"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NotificationData } from "../../NotificationData";
import { VueEvent } from "../../VueEvent";
import { vueEventEmitter } from "../../VueEventEmitter";
import { Notification } from "ueli-designsystem";

interface Data {
    notifications: NotificationData[];
}

export default defineComponent({
    components: {
        Notification,
    },

    data(): Data {
        return {
            notifications: [],
        };
    },

    methods: {
        addNotification(notification: NotificationData): void {
            const defaultNotificationDurationInMs = 5000;
            const index = this.notifications.push(notification);

            if (notification.autoHide) {
                setTimeout(
                    () => this.removeNotification(index - 1),
                    notification.autoHideDuration || defaultNotificationDurationInMs
                );
            }
        },

        removeNotification(index: number): void {
            this.notifications.splice(index, 1);
        },
    },

    mounted() {
        vueEventEmitter.on(VueEvent.Notification, (notification?: NotificationData) => {
            if (!notification) {
                return;
            }

            this.addNotification(notification);
        });
    },
});
</script>

<style scoped>
.notifications {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
}

.notification {
    font-size: var(--ueli-font-size-13);
    display: flex;
    flex-direction: revert;
    justify-content: flex-start;
    align-items: center;
    padding: var(--ueli-spacing-2x);
    box-sizing: border-box;
    border-radius: var(--ueli-corners);
    animation-name: moveIn;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-duration: var(--ueli-transition-speed);
}

.notification:not(:last-child) {
    margin-top: var(--ueli-spacing-2x);
}

.notification.default {
    background-color: var(--ueli-black-800);
}

.notification.success {
    background-color: var(--ueli-green);
}

.notification.warning {
    background-color: var(--ueli-orange);
}

.notification.danger {
    background-color: var(--ueli-red);
}

.notification-body {
    padding: 0 var(--ueli-spacing-2x);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.notification-icon {
    margin-right: var(--ueli-spacing-2x);
}

.notification-actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

@keyframes moveIn {
    0% {
        transform: translateX(150%);
    }
    100% {
        transform: translateX(0);
    }
}
</style>
