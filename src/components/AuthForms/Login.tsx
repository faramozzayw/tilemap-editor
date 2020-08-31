import React, { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import jwt_decode from "jwt-decode";

import {
	Button,
	Control,
	Label,
	Box,
	Title,
	ModalBackground,
	Modal,
	ModalContent,
	ModalClose,
	Buttons,
} from "./../../bulma";
import { GoogleAuth } from "./GoogleAuth";
import { LOGIN } from "../../graphql/";
import { addNotification } from "../../store/notificationStore";
import { useAuthState } from "../../hooks/auth";
import { LoginMutation } from "./../../types/graphql";
import { Tokens } from "../../types";

export interface Claims {
	readonly exp: number;
	readonly id: string;
	username: string;
}

export const LogIn = () => {
	const [modalActive, toggleModal] = useState(false);
	const { login } = useAuthState();

	const [loginQuery, { loading }] = useMutation<LoginMutation>(LOGIN, {
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

	const openModal = () => toggleModal(true);
	const closeModal = () => {
		toggleModal(false);
		formik.resetForm();
	};

	return (
		<>
			<Button isOutlined isColor="info" onClick={openModal}>
				Log in
			</Button>
			<Modal className="has-text-center" isActive={modalActive}>
				<ModalBackground onClick={closeModal} />
				<ModalContent>
					<Box>
						<form
							onSubmit={formik.handleSubmit}
							// @ts-ignore
							onReset={formik.resetForm}
						>
							<Title className="has-text-dark">Login</Title>
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
					</Box>
				</ModalContent>
				<ModalClose onClick={closeModal} isSize="large" />
			</Modal>
		</>
	);
};
