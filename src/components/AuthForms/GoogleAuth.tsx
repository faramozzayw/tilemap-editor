import React from "react";
import GoogleLogin from "react-google-login";

import { Title } from "../../bulma";
import { googleClientID } from "./consts";
import { useAuthState } from "../../hooks/auth";
import { Tokens, User } from "../../types";

export const GoogleAuth = () => {
	const { login } = useAuthState();

	const onFailure = (response: any) => {
		console.log(response);
	};

	const onSuccess = (response: any) => {
		console.log(response);
		const user: User = {
			email: response.profileObj.email,
			username: response.profileObj.name,
			image: response.profileObj.imageUrl,
		};

		const tokens: Tokens = {
			access_token: response.tokenObj.access_token,
			expires_in: response.tokenObj.expires_in,
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
					onSuccess={onSuccess}
					onFailure={onFailure}
					cookiePolicy={"single_host_origin"}
				/>
			</div>
		</>
	);
};
