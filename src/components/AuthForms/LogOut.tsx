import React from "react";
import { useHistory } from "react-router-dom";

import { Button } from "../../bulma";
import { useAuthState } from "../../hooks/auth";

export const LogOut = () => {
	const { logout } = useAuthState();
	const history = useHistory();

	const logoutHandler = () => {
		history.push("/");
		logout();
	};

	return (
		<Button
			isOutlined
			isColor="danger"
			onClick={logoutHandler}
			className="is-marginless is-fullwidth"
		>
			Log out
		</Button>
	);
};
