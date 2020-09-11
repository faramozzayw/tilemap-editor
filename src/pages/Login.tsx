import React, { useEffect } from "react";
import { useFormik } from "formik";
import jwt_decode from "jwt-decode";

import "./AuthForm.css";

import { Button, Control, Label, Title, Buttons, Hero } from "./../bulma";
import { GoogleAuth } from "./../components/AuthForms/GoogleAuth";
import { addNotification } from "../store/notificationStore";
import { useAuthState } from "../hooks/auth";
import { useLoginMutation } from "./../types/graphql";
import { Tokens } from "../types";
import { $ } from "./../utils";

export interface Claims {
	readonly exp: number;
	readonly id: string;
	readonly username: string;
}

export const Login = () => {
	useEffect(() => {
		let html = $("html")[0] as HTMLElement;
		html.classList.remove("has-navbar-fixed-top");
		return () => html.classList.add("has-navbar-fixed-top");
	}, []);

	const { login } = useAuthState();

	const [loginQuery, { loading }] = useLoginMutation({
		onCompleted: ({ loginUser }) => {
			const user: Claims = jwt_decode(loginUser.accessToken);

			login(user, {
				access_token: loginUser.accessToken,
				refresh_token: loginUser.refreshToken,
				expires_in: user.exp,
			} as Tokens);
			addNotification({
				type: "success",
				message: "Login was successful 🌈",
			});
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

	return (
		<Hero isColor="dark" isFullHeight>
			<form
				onSubmit={formik.handleSubmit}
				// @ts-ignore
				onReset={formik.resetForm}
				className="auth-form"
			>
				<Title className="auth-form-title">Login</Title>
				<hr />
				<fieldset disabled={loading}>
					<div className="field">
						<Label>username</Label>
						<Control>
							<input
								onChange={formik.handleChange}
								value={formik.values.username}
								className="input"
								type="username"
								name="username"
								placeholder="Input username"
								autoFocus
								required
							/>
						</Control>
					</div>
					<div className="field">
						<Label>Password</Label>
						<Control>
							<input
								onChange={formik.handleChange}
								value={formik.values.password}
								className="input"
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
								<Button isColor="success" type="submit">
									Login
								</Button>
								<Button isColor="light" type="reset">
									Reset
								</Button>
							</Buttons>
						</Control>
					</div>
					<GoogleAuth />
				</fieldset>
			</form>
		</Hero>
	);
};
