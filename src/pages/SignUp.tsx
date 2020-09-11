import React, { useEffect } from "react";
import { useFormik } from "formik";
import classnames from "classnames";

import Styles from "./AuthForm.module.css";

import { useSignUpMutation } from "../types/graphql";
import { Button, Control, Label, Title, Buttons, Hero } from "./../bulma";
import { GoogleAuth } from "./../components/AuthForms/GoogleAuth";
import { addNotification } from "../store/notificationStore";
import { $ } from "./../utils";
import { Link } from "react-router-dom";

export const SignUp = () => {
	useEffect(() => {
		let html = $("html")[0] as HTMLElement;
		html.classList.remove("has-navbar-fixed-top");
		return () => html.classList.add("has-navbar-fixed-top");
	}, []);

	const [singUpQuery, { loading }] = useSignUpMutation({
		onCompleted: console.table,
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
		onSubmit: (values) => {
			singUpQuery({
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
				className={Styles.AuthForm}
			>
				<Title className={Styles.AuthFormTitle}>Sign Up</Title>
				<hr className={Styles.Divider} />
				<fieldset disabled={loading}>
					<div className="field">
						<Label>Username</Label>
						<Control>
							<input
								value={formik.values.username}
								onChange={formik.handleChange}
								className={classnames("input", Styles.Input)}
								type="text"
								name="username"
								placeholder="Input username"
								autoFocus
								required
							/>
						</Control>
					</div>
					<div className="field">
						<Label>Email</Label>
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
						<Label>Password</Label>
						<Control>
							<input
								value={formik.values.password}
								onChange={formik.handleChange}
								className={classnames("input", Styles.Input)}
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
								<Button isColor="success" type="submit" isOutlined>
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
