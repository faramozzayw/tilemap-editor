import React, { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";

import { SIGN_UP } from "../../graphql";
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
import { addNotification } from "../../store/notificationStore";

export const SignUp = () => {
	const [modalActive, toggleModal] = useState(false);
	const [singUpQuery, { loading }] = useMutation(SIGN_UP, {
		onCompleted: (data) => {
			console.table(data);
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
		onSubmit: (values) => {
			singUpQuery({
				variables: { data: { ...values } },
			});
		},
	});

	const openModal = () => toggleModal(true);
	const closeModal = () => toggleModal(false);

	return (
		<>
			<Button isOutlined isColor="success" onClick={openModal}>
				<strong>Sign up</strong>
			</Button>
			<Modal className="has-text" isActive={modalActive}>
				<ModalBackground onClick={closeModal} />
				<ModalContent>
					<Box>
						<form
							onSubmit={formik.handleSubmit}
							// @ts-ignore
							onReset={formik.resetForm}
						>
							<Title className="has-text-dark">Sign Up</Title>
							<hr />
							<fieldset disabled={loading}>
								<div className="field">
									<Label>Username</Label>
									<Control>
										<input
											value={formik.values.username}
											onChange={formik.handleChange}
											className="input"
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
											className="input"
											type="email"
											name="email"
											placeholder="Input email"
											autoFocus
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
											className="input"
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
											<Button isColor="success" type="submit">
												Sign Up
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
