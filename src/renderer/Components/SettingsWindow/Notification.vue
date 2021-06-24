<template>
    <div class="notifications">
        <div
            class="notification"
            :class="typeClass(notification)"
            v-for="(notification, index) in notifications"
            :key="index"
        >
            <div class="notification-body">
                <Icon
                    v-if="notification.showIcon"
                    class="notification-icon"
                    :icon="notificationTypeIcon(notification)"
                />
                {{ notification.message }}
            </div>
            <div class="notification-actions">
                <IconButton icon="x" @click="removeNotification(index)" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NotificationData } from "../../NotificationData";
import { NotificationType } from "../../NotificationType";
import { VueEvent } from "../../VueEvent";
import { vueEventEmitter } from "../../VueEventEmitter";
import IconButton from "./IconButton.vue";
import Icon from "./Icon.vue";

interface Data {
    notifications: NotificationData[];
}

export default defineComponent({
    components: {
        Icon,
        IconButton,
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

        typeClass(notification: NotificationData): string {
            switch (notification.type) {
                case NotificationType.Success:
                    return "success";

                case NotificationType.Warning:
                    return "warning";

                case NotificationType.Danger:
                    return "danger";

                case NotificationType.Default:
                default:
                    return "default";
            }
        },

        notificationTypeIcon(notification: NotificationData): string {
            switch (notification.type) {
                case NotificationType.Success:
                    return "check-circle";

                case NotificationType.Warning:
                    return "exclamation-triangle";

                case NotificationType.Danger:
                    return "exclamation-triangle-fill";

                case NotificationType.Default:
                default:
                    return "info-circle";
            }
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
