import React, { useLayoutEffect } from "react";
import { useFormik } from "formik";
import { Link, useHistory, Redirect } from "react-router-dom";
import * as Yup from "yup";
import {
	Button,
	Control,
	Title,
	Buttons,
	Hero,
	Field,
} from "@faramo.zayw/reabulma";

import Styles from "./AuthForm.module.css";

import { useSignUpMutation } from "../types/graphql";
import { GoogleAuth } from "./../components/AuthForms/GoogleAuth";
import { addNotification } from "../store/notificationStore";
import { $ } from "./../utils";
import { useAuthState } from "../hooks/auth";
import { email, password, username } from "../validation-subsets";
import { InputField } from "../components/Profile";
import { PasswordInput } from "../components/InputField";

const SignupSchema = Yup.object().shape({
	username,
	password,
	email,
});

export const SignUp = () => {
	const history = useHistory();
	useLayoutEffect(() => {
		let html = $("html")[0] as HTMLElement;
		html.classList.remove("has-navbar-fixed-top");
		return () => html.classList.add("has-navbar-fixed-top");
	}, []);

	const { login, isAuthenticated } = useAuthState();

	const [singUpQuery, { loading }] = useSignUpMutation({
		onCompleted: ({ signUp: jwt }) => {
			login(jwt);
			addNotification({
				type: "success",
				message: "Success! 🌈 \n ~ ~ Redirect to home page ~ ~",
			});
			history.push("/login");
		},
		onError: (e) => {
			console.error(e);
			addNotification({
				type: "danger",
				message: "Something bad wrong.",
			});
		},
	});

	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
		},
		validateOnChange: true,
		validateOnMount: true,
		validationSchema: SignupSchema,
		onSubmit: (values) => {
			singUpQuery({
				variables: { data: { ...values } },
			});
		},
	});

	if (isAuthenticated) {
		return <Redirect to="/" />;
	}

	return (
		<Hero isColor="dark" isFullHeight className={Styles.AuthFormWrapper}>
			<form
				onSubmit={formik.handleSubmit}
				onReset={() => formik.resetForm()}
				className={Styles.AuthForm}
			>
				<Title className={Styles.AuthFormTitle}>Sign Up</Title>
				<hr className={Styles.Divider} />
				<fieldset disabled={loading}>
					<InputField
						description="Username"
						onChange={formik.handleChange}
						value={formik.values.username}
						min="2"
						max="25"
						type="text"
						name="username"
						placeholder="Input username"
						autoFocus
						required
					/>
					<InputField
						description="Email"
						hepler={formik.errors.email}
						value={formik.values.email}
						onChange={formik.handleChange}
						type="email"
						name="email"
						placeholder="Input email"
						required
					/>
					<PasswordInput
						description="Password"
						value={formik.values.password}
						onChange={formik.handleChange}
						hepler={formik.errors.password}
						min="10"
						max="50"
						name="password"
						autoComplete="new-password"
						placeholder="Input password"
						required
					/>
					<Field className="is-grouped">
						<Control>
							<Buttons>
								<Button
									isColor="success"
									type="submit"
									isOutlined
									isLoading={loading}
								>
									Sign Up
								</Button>
								<Button isColor="warning" type="reset" isOutlined>
									Reset
								</Button>
							</Buttons>
						</Control>
					</Field>
					<GoogleAuth />
				</fieldset>
				<br />
				<Link to="/login" className="has-text-info">
					already have a account?
				</Link>
			</form>
		</Hero>
	);
};
