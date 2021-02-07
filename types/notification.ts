export type NotificationType = "success" | "warning" | "info" | "danger";
export type NotificationID = number;
export type NewNotificaion = Omit<Notification, "id">;

export interface Notification {
	id: NotificationID;
	type: NotificationType;
	message: string;
}
