import React, { useLayoutEffect } from "react";
import { useFormik } from "formik";
import classnames from "classnames";
import { Link, useHistory, Redirect } from "react-router-dom";
import * as Yup from "yup";
import {
	Button,
	Control,
	Label,
	Title,
	Buttons,
	Hero,
	Help,
} from "@faramo.zayw/reabulma";

import Styles from "./AuthForm.module.css";

import { GoogleAuth } from "./../components/AuthForms/GoogleAuth";
import { addNotification } from "../store/notificationStore";
import { useAuthState } from "../hooks/auth";
import { useLoginMutation } from "./../types/graphql";
import { $ } from "./../utils";
import { password, username } from "../validation-subsets";

const LoginSchema = Yup.object().shape({
	username,
	password,
});

export const Login = () => {
	const history = useHistory();
	useLayoutEffect(() => {
		let html = $("html")[0] as HTMLElement;
		html.classList.remove("has-navbar-fixed-top");
		return () => html.classList.add("has-navbar-fixed-top");
	}, []);

	const { login, isAuthenticated } = useAuthState();

	const [loginQuery, { loading }] = useLoginMutation({
		onCompleted: ({ login: jwt }) => {
			login(jwt);
			addNotification({
				type: "success",
				message: "Login was successful 🌈 \n ~ ~ Redirect to home page ~ ~",
			});
			history.push("/");
		},
		onError: (e) => {
			console.error(e);
			addNotification({
				type: "danger",
				message: "Access denied.",
			});
		},
	});

	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validateOnChange: true,
		validationSchema: LoginSchema,
		onSubmit: (values) => {
			loginQuery({
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
				<Title className={Styles.AuthFormTitle}>Login</Title>
				<hr className={Styles.Divider} />
				<fieldset disabled={loading}>
					<div className="field">
						<Label className={classnames(Styles.Label, Styles.LabelWithHelp)}>
							Username
							<Help isColor="warning">{formik.errors.username}</Help>
						</Label>
						<Control>
							<input
								onChange={formik.handleChange}
								value={formik.values.username}
								className={classnames("input", Styles.Input)}
								min="2"
								max="25"
								type="username"
								name="username"
								placeholder="Input username"
								autoFocus
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
								onChange={formik.handleChange}
								value={formik.values.password}
								className={classnames("input", Styles.Input)}
								min="10"
								max="50"
								id="password"
								type="password"
								name="password"
								autoComplete="current-password"
								placeholder="Input password"
								required
							/>
							{/* <Help isColor="primary">Show password</Help> */}
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
									Login
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
				<Link to="/signup" className="has-text-info">
					have not account yet?
				</Link>
			</form>
		</Hero>
	);
};
