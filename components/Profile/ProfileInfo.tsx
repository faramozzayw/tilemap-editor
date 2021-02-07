import React, { useState, useRef, useEffect } from "react";

import { Buttons, Button } from "@faramo.zayw/reabulma";
import { addNotification } from "../../store/notificationStore";
import { InputField } from "../InputField/InputField";

import ProfilePicStyle from "./ProfilePic.module.css";
import { User } from "../../types";
import { IAuth } from "../../types/auth";
import { useUpdateUserMutation } from "../../types/graphql";
import { Can } from "../../common";
import { useAuthState } from "../../hooks/auth";

export interface ProfileInfo extends IAuth {
	user: User;
}

export const ProfileInfo: React.FC<ProfileInfo> = ({ user }) => {
	const { user: authUser } = useAuthState();
	const [editStatus, setEditStatus] = useState(false);

	const usernameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const { username, email } = user;
		if (usernameRef.current && username) {
			usernameRef.current.value = username;
		}
		if (emailRef.current && email) {
			emailRef.current.value = email;
		}
	}, [user, emailRef, usernameRef]);

	const [updateUserInfo, { loading }] = useUpdateUserMutation({
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
	});

	const updateUserInfoHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const username = usernameRef.current?.value.trim();
		const email = emailRef.current?.value.trim();

		updateUserInfo({
			variables: {
				data: { username, email },
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
					disabled={!editStatus}
				>
					<span className={`is-family-code ${ProfilePicStyle.Symbol}`}>@</span>
				</InputField>

				<InputField
					ref={emailRef}
					type="email"
					name="email"
					description="~~email~~"
					disabled={!editStatus}
				/>
				<Can
					role="user"
					perform="user:edit"
					data={{ userId: authUser?.id, ownerId: user.id }}
				>
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
				</Can>
			</fieldset>
		</form>
	);
};
