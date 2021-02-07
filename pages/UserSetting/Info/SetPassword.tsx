import React from "react";
import { Button } from "@faramo.zayw/reabulma";
import { useFormik } from "formik";
import * as Yup from "yup";

import { CoolBox } from "../../../common";
import { PasswordInput } from "../../../components/InputField";
import { useChangePasswordMutation } from "../../../types/graphql";
import { addNotification } from "../../../store/notificationStore";
import { password } from "../../../validation-subsets";

const Schema = Yup.object().shape({
	password,
});

export const SetPassword = () => {
	const [changePassword, { loading }] = useChangePasswordMutation({
		onCompleted: (res) =>
			addNotification({
				type: "success",
				message: res.changePassword,
			}),
		onError: (err) =>
			addNotification({
				type: "danger",
				message: err.message,
			}),
	});
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
		validateOnMount: true,
		validateOnChange: true,
		validationSchema: Schema,
		onSubmit: (values) =>
			changePassword({
				variables: {
					...values,
					newPassword: values.password,
				},
			}),
	});

	return (
		<CoolBox title="set password">
			<form onSubmit={formik.handleSubmit}>
				<fieldset disabled={loading}>
					<PasswordInput
						value={formik.values.password}
						onChange={formik.handleChange}
						hepler={formik.errors.password}
						min="10"
						max="50"
						name="password"
						autoComplete="new-password"
						placeholder="new password"
						required
					/>
					<PasswordInput
						value={formik.values.confirm}
						hepler={formik.errors.confirm}
						onChange={formik.handleChange}
						min="10"
						max="50"
						autoComplete="new-password"
						name="confirm"
						placeholder="confirm new password"
						required
					/>
					<Button type="submit" isColor="info" isLoading={loading}>
						set password
					</Button>
				</fieldset>
			</form>
		</CoolBox>
	);
};
