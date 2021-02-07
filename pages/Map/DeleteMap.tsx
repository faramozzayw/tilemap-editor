import React from "react";
import { Button } from "@faramo.zayw/reabulma";

import { useDeleteMapMutation } from "../../types/graphql";
import { addNotification } from "../../store/notificationStore";
import { MapParams } from "./Map";
import { useParams, useHistory } from "react-router-dom";

export const DeleteMap: React.FC = () => {
	const { mapID } = useParams<MapParams>();
	const history = useHistory();

	const [deleteUser, { loading }] = useDeleteMapMutation({
		variables: { mapID },
		onCompleted: (_) => {
			addNotification({
				type: "success",
				message: "Map deleted successfully!",
			});
			history.push("/");
		},

		onError: (err) => {
			console.error(err);
			history.push("/");
			/*
            need to fix with backend
			addNotification({
				type: "danger",
				message: "Something bad wrong...",
            })
            */
		},
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
				<p>Delete map</p>
			</div>
			<div className="message-body">
				<p>
					Once you delete this map, there is no going back. Please be certain.
				</p>
				<br />
				<Button
					type="submit"
					isColor="danger"
					isLoading={loading}
					disabled={loading}
				>
					Delete this map
				</Button>
			</div>
		</form>
	);
};
