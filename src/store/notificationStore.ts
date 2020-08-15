import { createStore, createEvent, createEffect } from "effector";
import {
	Notification,
	NewNotificaion,
	NotificationID,
} from "../types/notification";

export interface INotificationStore {
	notifications: Notification[];
}

export const initState: INotificationStore = {
	notifications: [],
};

export const addNotification = createEvent<NewNotificaion>(
	"Add new notification",
);
export const deleteNotification = createEvent<NotificationID>(
	"Delete notification by ID",
);
export const deleteNotificationEffect = createEffect<
	NotificationID,
	Promise<number>
>({
	handler: async (id) => {
		const promise = new Promise((resolve) => {
			resolve(setTimeout(() => deleteNotification(id), 5000));
		});
		const timerID = await promise;
		return timerID as number;
	},
});

export const reset = createEvent();

export const notificationStore = createStore<INotificationStore>(initState)
	.on(addNotification, (store, newNotificaion) => {
		const id = store.notifications.length + 1;
		deleteNotificationEffect(id);

		return {
			...store,
			notifications: store.notifications.concat({
				...newNotificaion,
				id: id,
			}),
		};
	})
	.on(deleteNotification, (store, deleteID) => ({
		...store,
		notifications: store.notifications.filter(({ id }) => deleteID !== id),
	}))
	.reset(reset);
