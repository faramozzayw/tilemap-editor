import React from "react";
import classnames from "classnames";

import { Portal } from "../../common";
import NotifyStyle from "./Notify.module.css";
import { Notification } from "../../bulma";
import { useStore } from "effector-react";
import {
	notificationStore,
	deleteNotification,
} from "../../store/notificationStore";

export const NotifyLayout: React.FC = () => {
	const { notifications } = useStore(notificationStore);

	return (
		<Portal className={NotifyStyle.wrapper}>
			<div className={classnames(NotifyStyle.notifyList)}>
				{notifications.map(({ message, type, id }) => (
					<Notification isColor={type} isLight key={id}>
						<button
							className="delete"
							onClick={() => deleteNotification(id)}
						></button>
						{message}
					</Notification>
				))}
			</div>
		</Portal>
	);
};
