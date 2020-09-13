import React, { useEffect } from "react";
import { useFormik } from "formik";
import jwt_decode from "jwt-decode";
import classnames from "classnames";

import Styles from "./AuthForm.module.css";

import { Button, Control, Label, Title, Buttons, Hero } from "./../bulma";
import { GoogleAuth } from "./../components/AuthForms/GoogleAuth";
import { addNotification } from "../store/notificationStore";
import { useAuthState } from "../hooks/auth";
import { useLoginMutation } from "./../types/graphql";
import { Tokens, Claims } from "../types";
import { $ } from "./../utils";
import { Link, useHistory, Redirect } from "react-router-dom";

export const Login = () => {
	const history = useHistory();
	useEffect(() => {
		let html = $("html")[0] as HTMLElement;
		html.classList.remove("has-navbar-fixed-top");
		return () => html.classList.add("has-navbar-fixed-top");
	}, []);

	const { login, isAuthenticated } = useAuthState();

	const [loginQuery, { loading }] = useLoginMutation({
		onCompleted: ({ login: jwt }) => {
			const user: Claims = jwt_decode(jwt.accessToken);

			login(user, {
				access_token: jwt.accessToken,
				refresh_token: jwt.refreshToken,
				expires_in: user.exp,
			} as Tokens);
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
		<Hero isColor="dark" isFullHeight>
			<form
				onSubmit={formik.handleSubmit}
				// @ts-ignore
				onReset={formik.resetForm}
				className={Styles.AuthForm}
			>
				<Title className={Styles.AuthFormTitle}>Login</Title>
				<hr className={Styles.Divider} />
				<fieldset disabled={loading}>
					<div className="field">
						<Label className={Styles.Label}>Username</Label>
						<Control>
							<input
								onChange={formik.handleChange}
								value={formik.values.username}
								className={classnames("input", Styles.Input)}
								type="username"
								name="username"
								placeholder="Input username"
								autoFocus
								required
							/>
						</Control>
					</div>
					<div className="field">
						<Label className={Styles.Label}>Password</Label>
						<Control>
							<input
								onChange={formik.handleChange}
								value={formik.values.password}
								className={classnames("input", Styles.Input)}
								id="password"
								type="password"
								name="password"
								autoComplete="current-password"
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
