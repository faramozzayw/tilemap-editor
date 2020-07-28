import React, { useState } from "react";
import classnames from "classnames";

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
} from "./../../bulma";
import { GoogleAuth } from "./GoogleAuth";

export const LogIn = () => {
	const [modalActive, toggleModal] = useState(false);

	const openModal = () => toggleModal(true);
	const closeModal = () => toggleModal(false);

	return (
		<>
			<Button isOutlined isColor="info" onClick={openModal}>
				Log in
			</Button>
			<Modal className="has-text" isActive={modalActive}>
				<ModalBackground onClick={closeModal} />
				<ModalContent>
					<Box>
						<form>
							<Title className="has-text-dark">Login</Title>
							<hr />
							<div className="field">
								<Label>Email</Label>
								<Control>
									<input
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
										className="input"
										type="password"
										name="current-password"
										autoComplete="current-password"
										placeholder="Input password"
										required
									/>
								</Control>
							</div>
							<div className="field is-grouped">
								<Control>
									<Button isColor="success" type="submit">
										Login
									</Button>
								</Control>
							</div>
							<GoogleAuth />
						</form>
					</Box>
				</ModalContent>
				<ModalClose onClick={closeModal} isSize="large" />
			</Modal>
		</>
	);
};
