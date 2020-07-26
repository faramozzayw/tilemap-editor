import React, { useState } from "react";
import classnames from "classnames";

import { Button, Control, Label, Box, Title } from "./../../bulma";
import { ModalBackground } from "../../bulma/components/Modal";
import { GoogleAuth } from "./GoogleAuth";

export const SignUp = () => {
	const [modalActive, toggleModal] = useState(false);

	const openModal = () => toggleModal(true);
	const closeModal = () => toggleModal(false);

	return (
		<>
			<Button isOutlined isColor="success" onClick={openModal}>
				<strong>Sign up</strong>
			</Button>
			<div
				className={classnames("modal has-text", { "is-active": modalActive })}
			>
				<ModalBackground onClick={closeModal} />
				<div className="modal-content">
					<Box>
						<form>
							<Title className="has-text-dark">Sign Up</Title>
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
										name="new-password"
										autoComplete="new-password"
										placeholder="Input password"
										required
									/>
								</Control>
							</div>
							<div className="field is-grouped">
								<Control>
									<Button isColor="success" type="submit">
										Sign Up
									</Button>
								</Control>
							</div>
							<GoogleAuth />
						</form>
					</Box>
				</div>
				<button
					className="modal-close is-large"
					aria-label="Close sign up modal"
					onClick={closeModal}
				></button>
			</div>
		</>
	);
};
