import React, { useEffect } from "react";
import { useFormik } from "formik";
import classnames from "classnames";
import { Link, useHistory, Redirect } from "react-router-dom";
import * as Yup from "yup";

import Styles from "./AuthForm.module.css";

import { useSignUpMutation } from "../types/graphql";
import { Button, Control, Label, Title, Buttons, Hero, Help } from "./../bulma";
import { GoogleAuth } from "./../components/AuthForms/GoogleAuth";
import { addNotification } from "../store/notificationStore";
import { $ } from "./../utils";
import { useAuthState } from "../hooks/auth";

const SignupSchema = Yup.object().shape({
	username: Yup.string()
		.min(2, "Too Short!")
		.max(25, "Too Long!")
		.required("Required"),
	password: Yup.string()
		.min(10, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	email: Yup.string().email("Invalid email").required("Required"),
});

export const SignUp = () => {
	const history = useHistory();
	useEffect(() => {
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
					<div className="field">
						<Label className={classnames(Styles.Label, Styles.LabelWithHelp)}>
							Username
							<Help isColor="warning">{formik.errors.username}</Help>
						</Label>
						<Control>
							<input
								value={formik.values.username}
								onChange={formik.handleChange}
								className={classnames("input", Styles.Input)}
								min="2"
								max="25"
								type="text"
								name="username"
								placeholder="Input username"
								autoFocus
								required
							/>
						</Control>
					</div>
					<div className="field">
						<Label className={classnames(Styles.Label, Styles.LabelWithHelp)}>
							Email
							<Help isColor="warning">{formik.errors.email}</Help>
						</Label>
						<Control>
							<input
								value={formik.values.email}
								onChange={formik.handleChange}
								className={classnames("input", Styles.Input)}
								type="email"
								name="email"
								placeholder="Input email"
								required
							/>
						</Control>
					</div>
					<div className="field">
						<Label className={classnames(Styles.Label, Styles.LabelWithHelp)}>
							Password
							<Help isColor="warning">{formik.errors.password}</Help>
						</Label>
						<Control>
							<input
								value={formik.values.password}
								onChange={formik.handleChange}
								className={classnames("input", Styles.Input)}
								min="10"
								max="50"
								type="password"
								name="password"
								autoComplete="new-password"
								placeholder="Input password"
								required
							/>
						</Control>
					</div>
					<div className="field is-grouped">
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
					</div>
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
