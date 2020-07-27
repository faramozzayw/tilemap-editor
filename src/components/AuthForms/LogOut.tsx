import React from "react";
import { Button, NavbarItem } from "../../bulma";
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
		<NavbarItem>
			<Button
				isOutlined
				isColor="danger"
				onClick={logout}
				className="is-marginless is-fullwidth"
			>
				Log out
			</Button>
		</NavbarItem>
	);
};
