import React from "react";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";

import { Title } from "../../bulma";
import { googleClientID } from "./consts";
import { useAuthState } from "../../hooks/auth";
import { useLoginByGoolgeMutation } from "../../types/graphql";

const handleErr = (response: any) => {
	const error = JSON.stringify(response, null, 2);
	console.error(error);
	console.error("Google login error");
};

export const GoogleAuth = () => {
	const { login } = useAuthState();
	const [loginByGoogle] = useLoginByGoolgeMutation({
		onCompleted: ({ loginByGoolge: jwt }) => {
			login(jwt);
		},
		onError: handleErr,
	});
	const onFailure = handleErr;

	const onSuccess = (response: GoogleLoginResponse) => {
		const basicProfile = response.getBasicProfile();

		loginByGoogle({
			variables: {
				loginData: {
					email: basicProfile.getEmail(),
					username: basicProfile.getName(),
					imageUrl: basicProfile.getImageUrl(),
					gooogleId: basicProfile.getId(),
				},
			},
		});
	};

	return (
		<div className="google-auth">
			<Title className="has-text-light" isSize={5}>
				Or you can login by
			</Title>
			<div className="field is-grouped">
				<GoogleLogin
					clientId={googleClientID}
					buttonText="Login"
					// @ts-ignore
					onSuccess={onSuccess}
					onFailure={onFailure}
					theme="dark"
					accessType="offline"
				/>
			</div>
		</div>
	);
};
