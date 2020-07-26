import React from "react";
import GoogleLogin from "react-google-login";

import { Title } from "../../bulma";
import { googleClientID } from "./consts";
import { useAuthState } from "../../hooks/auth";

export const GoogleAuth = () => {
	const { login } = useAuthState();

	const responseGoogle = (str: string) => (response: any) => {
		console.log(str, response);
	};

	const onSuccess = (response: any) => {
		const user = {
			email: response.profileObj.email,
			username: response.profileObj.name,
			image: response.profileObj.imageUrl,
		};

		login(user);
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
					onFailure={responseGoogle("onFailure")}
					cookiePolicy={"single_host_origin"}
				/>
			</div>
		</>
	);
};
