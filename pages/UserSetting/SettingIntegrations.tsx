import React from "react";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";

import { CoolBox } from "../../common";
import { googleClientID } from "../../components/AuthForms/consts";
import { useAuthState } from "../../hooks/auth";
import { useLoginByGoolgeMutation } from "../../types/graphql";
import { addNotification } from "../../store/notificationStore";

export const SettingIntegrations = () => {
	const { user } = useAuthState();
	const [loginByGoogle, { loading }] = useLoginByGoolgeMutation({
		onCompleted: (_) => {
			addNotification({
				type: "success",
				message: "Login was successful 🌈 \n ~ ~ Redirect to home page ~ ~",
			});
		},
		onError: console.error,
	});

	const onFailure = (response: any) => {
		const error = JSON.stringify(response, null, 2);
		console.error(error);
		console.error("Google login error");
	};

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
		<CoolBox title="integrations">
			<div className="message is-link">
				<div className="message-body">
					<GoogleLogin
						clientId={googleClientID}
						buttonText={
							user?.googleId ? "Sync with google" : "Connect to google"
						}
						// @ts-ignore
						onSuccess={onSuccess}
						onFailure={onFailure}
						theme="dark"
						accessType="offline"
						disabled={loading}
					/>
				</div>
			</div>
		</CoolBox>
	);
};
