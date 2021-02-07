import React from "react";
import { Button } from "@faramo.zayw/reabulma";

import { useDeleteUserMutation } from "../../../types/graphql";
import { addNotification } from "../../../store/notificationStore";
import { useAuthState } from "../../../hooks/auth";

export const DeleteUser = () => {
	const {
		// @ts-ignore
		user: { id },
		logout,
	} = useAuthState();
	const [deleteUser] = useDeleteUserMutation({
		variables: { id },
		onCompleted: (result) => {
			logout();
			addNotification({
				type: "success",
				message: result.deleteUser,
			});
		},
		onError: (err) =>
			addNotification({
				type: "danger",
				message: err.message,
			}),
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (window.confirm("Are u sure?")) {
			addNotification({
				type: "info",
				message: "understandable, have a nice day",
			});
			deleteUser();
		}
	};

	return (
		<form className="message is-danger" onSubmit={handleSubmit}>
			<div className="message-header">
				<p>Delete account</p>
			</div>
			<div className="message-body">
				<p>
					Once you delete your account, there is no going back. Please be
					certain.
				</p>
				<br />
				<Button type="submit" isColor="danger">
					Delete ur account
				</Button>
			</div>
		</form>
	);
};
