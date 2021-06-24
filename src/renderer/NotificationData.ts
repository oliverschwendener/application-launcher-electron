import { NotificationType } from "./NotificationType";

export interface NotificationData {
    message: string;
    autoHide: boolean;
    autoHideDuration?: number;
    type?: NotificationType;
    showIcon?: boolean;
}
