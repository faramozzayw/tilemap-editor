import React from "react";
import { Button } from "@faramo.zayw/reabulma";
import { useFormik } from "formik";

import { CoolBox } from "../../../common";
import { Textarea } from "../../../components/InputField";
import { useUpdateUserMutation } from "../../../types/graphql";
import { addNotification } from "../../../store/notificationStore";
import { useAuthState } from "../../../hooks/auth";

export const SetDescription = () => {
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
