import React from "react";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";

import { Title } from "../../bulma";
import { googleClientID } from "./consts";
import { useAuthState } from "../../hooks/auth";
import { Tokens, User } from "../../types";
import { isDevEnv } from "../../utils";

export const GoogleAuth = () => {
	const { login, isAuthenticated } = useAuthState();

	const onFailure = (response: any) => {
		const error = JSON.stringify(response, null, 2);
		console.error(error);
		alert("Google login error");
	};

	const onSuccess = (response: GoogleLoginResponse) => {
		const { access_token, expires_in } = response.getAuthResponse();

		const basicProfile = response.getBasicProfile();

		const user: User = {
			email: basicProfile.getEmail(),
			username: basicProfile.getName(),
			image: basicProfile.getImageUrl(),
		};

		const tokens: Tokens = {
			access_token,
			expires_in,
		};

		login(user, tokens);
	};

	return (
		<>
			<Title className="has-text-dark" isSize={5}>
				Or your can login by
			</Title>
			<div className="field is-grouped">
				<GoogleLogin
					clientId={googleClientID}
					buttonText="Login"
					// @ts-ignore
					onSuccess={onSuccess}
					onFailure={onFailure}
					theme="dark"
					isSignedIn={isAuthenticated}
				/>
			</div>
		</>
	);
};
