import React from "react";
import { Button } from "@faramo.zayw/reabulma";
import { useFormik } from "formik";

import { CoolBox } from "../../../common";
import { PasswordInput } from "../../../components/InputField";

export const SetPassword = () => {
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
