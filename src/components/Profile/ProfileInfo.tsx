import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { Buttons, Button } from "../../bulma";
import { UPDATE_USER_INFO } from "../../graphql/mutation";
import { addNotification } from "../../store/notificationStore";
import { InputField } from "./InputField";

import ProfilePicStyle from "./ProfilePic.module.css";
import { User } from "../../types";
import { IAuth } from "../../types/auth";

export interface ProfileInfo extends IAuth {
	user: User;
}

export const ProfileInfo: React.FC<ProfileInfo> = ({ user, isAuth }) => {
	const [editStatus, setEditStatus] = useState(false);

	const usernameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);

	const [updateUserInfo, { loading }] = useMutation<any>(UPDATE_USER_INFO, {
		optimisticResponse: true,
		onCompleted: (data) => {
			const { username, email } = data.updateUserInfo;
			if (usernameRef.current) {
				usernameRef.current.value = username;
			}
			if (emailRef.current) {
				emailRef.current.value = email;
			}
			setEditStatus(false);
		},
		onError: () =>
			addNotification({
				type: "danger",
				message: "Failed update user info",
			}),
	});

	const updateUserInfoHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const username = usernameRef.current?.value.trim();
		const email = emailRef.current?.value.trim();

		updateUserInfo({
			variables: {
				id: "e6c47a5b-eede-4ffd-8d33-d746a6b94ea0",
				updateValue: { username, email },
			},
		});
	};

	return (
		<form onSubmit={updateUserInfoHandler}>
			<InputField
				name="username"
				ref={usernameRef}
				description="+|__username__|+"
				defaultValue={user?.username}
				disabled={!editStatus}
			>
				<span className={`is-family-code ${ProfilePicStyle.Symbol}`}>@</span>
			</InputField>

			<InputField
				ref={emailRef}
				type="email"
				name="email"
				description="~~email~~"
				defaultValue={user?.email}
				disabled={!editStatus}
			/>
			{!editStatus && (
				<Button
					type="button"
					onClick={() => setEditStatus(true)}
					isColor="info"
				>
					wanna edit your info?
				</Button>
			)}
			{editStatus && (
				<Buttons>
					<Button
						disabled={loading}
						isColor="light"
						onClick={() => setEditStatus(false)}
					>
						cancel
					</Button>
					<Button
						disabled={loading}
						isLoading={loading}
						isColor="success"
						type="submit"
					>
						save
					</Button>
				</Buttons>
			)}
		</form>
	);
};
