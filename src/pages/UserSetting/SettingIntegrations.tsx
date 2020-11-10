import React from "react";
import GoogleLogin from "react-google-login";

import { CoolBox } from "../../common";
import { googleClientID } from "../../components/AuthForms/consts";
import { useAuthState } from "../../hooks/auth";

export const SettingIntegrations = () => {
	const { user } = useAuthState();

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
						onSuccess={() => alert("Success")}
						onFailure={() => alert("Failure")}
						theme="dark"
						accessType="offline"
					/>
				</div>
			</div>
		</CoolBox>
	);
};
