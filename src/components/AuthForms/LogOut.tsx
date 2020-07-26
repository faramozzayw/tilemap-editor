import React from "react";
import { Button } from "../../bulma";
// import { useGoogleLogout } from "react-google-login";
// import { googleClientID } from "./consts";
import { useAuthState } from "../../hooks/auth";

export const LogOut = () => {
	const { logout } = useAuthState();

	/*
	const { signOut, loaded } = useGoogleLogout({
		clientId: googleClientID,
		onFailure: () => console.error("onFailure"),
		onLogoutSuccess: () => console.info("onLogoutSuccess"),
		cookiePolicy: "single_host_origin",
	});
    */

	return (
		<div className="navbar-end">
			<div className="navbar-item">
				<div className="buttons">
					<Button isOutlined isColor="danger" onClick={logout}>
						Log out
					</Button>
				</div>
			</div>
		</div>
	);
};
