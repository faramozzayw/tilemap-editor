import React, { FormEvent } from "react";
import { Button, Tile } from "@faramo.zayw/reabulma";
import { useFormik } from "formik";

import { CoolBox } from "../../../common";
import { PasswordInput, Textarea } from "../../../components/InputField";
import { useUpdateUserMutation } from "../../../types/graphql";
import { addNotification } from "../../../store/notificationStore";
import { useAuthState } from "../../../hooks/auth";

const SetDescription = () => {
	const { user, updateUser: updateLocalUser } = useAuthState();
	const [updateUser, { loading }] = useUpdateUserMutation({
		onCompleted: ({ updateUserInfo: { description } }) => {
			addNotification({
				type: "success",
				message: "Description update was successful!~",
			});
			updateLocalUser({
				description,
			} as any);
		},
		onError: () =>
			addNotification({
				type: "danger",
				message: "Something bad wrong! We can't update it! Try again...",
			}),
	});
	const formik = useFormik({
		initialValues: {
			description: user?.description ?? "",
		},
		onSubmit: ({ description }) =>
			updateUser({
				variables: { data: { description } },
			}),
	});

	return (
		<CoolBox title="set description">
			<form onSubmit={formik.handleSubmit}>
				<fieldset disabled={loading}>
					<Textarea
						type="text"
						value={formik.values.description}
						onChange={formik.handleChange}
						name="description"
						placeholder="new description"
						min="4"
					/>
					<Button isColor="info" type="submit" isLoading={loading}>
						set description
					</Button>
				</fieldset>
			</form>
		</CoolBox>
	);
};

const SetPassword = () => {
	const formik = useFormik({
		initialValues: {
			password: "",
			confirm: "",
		},
		validate: (values) => {
			if (values.password !== values.confirm) {
				return {
					confirm: "Passwords do not match",
				};
			}
		},
		onSubmit: (values) => console.table(values),
	});

	return (
		<CoolBox title="set password">
			<form onSubmit={formik.handleSubmit}>
				<PasswordInput
					value={formik.values.password}
					onChange={formik.handleChange}
					min="2"
					max="25"
					name="password"
					autoComplete="new-password"
					placeholder="new password"
					required
				/>
				<PasswordInput
					value={formik.values.confirm}
					hepler={formik.errors.confirm}
					onChange={formik.handleChange}
					min="2"
					max="25"
					autoComplete="new-password"
					name="confirm"
					placeholder="confirm new password"
					required
				/>
				<Button type="submit" isColor="info">
					set password
				</Button>
			</form>
		</CoolBox>
	);
};

const DeleteUser = () => {
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<form className="message is-danger" onSubmit={handleSubmit}>
			<div className="message-header">
				<p>Delete account</p>
			</div>
			<div className="message-body">
				<p>
					Once you delete your account, there is no going back. Please be
					certain.
				</p>
				<br />
				<Button type="submit" isColor="danger">
					Delete ur account
				</Button>
			</div>
		</form>
	);
};

export const SettingInfo = () => (
	<Tile isAncestor>
		<Tile isParent isVertical>
			<Tile isChild>
				<SetDescription />
			</Tile>
			<Tile isChild>
				<SetPassword />
			</Tile>
			<Tile isChild>
				<DeleteUser />
			</Tile>
		</Tile>
	</Tile>
);
