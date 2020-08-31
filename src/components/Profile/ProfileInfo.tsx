import React, { useState, useRef } from "react";
import { useMutation } from "@apollo/client";

import { Buttons, Button } from "../../bulma";
import { UPDATE_USER_INFO } from "../../graphql/mutation";
import { addNotification } from "../../store/notificationStore";
import { InputField } from "./InputField";

import ProfilePicStyle from "./ProfilePic.module.css";
import { User } from "../../types";
import { IAuth } from "../../types/auth";
import { UpdateUserMutation } from "../../types/graphql";

export interface ProfileInfo extends IAuth {
	user: User;
}

export const ProfileInfo: React.FC<ProfileInfo> = ({ user }) => {
	const [editStatus, setEditStatus] = useState(false);

	const usernameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);

	const [updateUserInfo, { loading }] = useMutation<UpdateUserMutation>(
		UPDATE_USER_INFO,
		{
			// optimisticResponse: true,
			onCompleted: ({ updateUserInfo }) => {
				const { username, email } = updateUserInfo;
				if (usernameRef.current && username) {
					usernameRef.current.value = username;
				}
				if (emailRef.current && email) {
					emailRef.current.value = email;
				}
				setEditStatus(false);
			},
			onError: () =>
				addNotification({
					type: "danger",
					message: "Failed update user info",
				}),
		},
	);

	const updateUserInfoHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const username = usernameRef.current?.value.trim();
		const email = emailRef.current?.value.trim();

		updateUserInfo({
			variables: {
				updateValue: { username, email },
			},
		});
	};

	return (
		<form onSubmit={updateUserInfoHandler}>
			<fieldset disabled={loading}>
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
						isColor="info"
						onClick={() => setEditStatus(true)}
					>
						wanna edit your info?
					</Button>
				)}
				{editStatus && (
					<Buttons>
						<Button isColor="light" onClick={() => setEditStatus(false)}>
							cancel
						</Button>
						<Button type="submit" isColor="success">
							save
						</Button>
					</Buttons>
				)}
			</fieldset>
		</form>
	);
};
