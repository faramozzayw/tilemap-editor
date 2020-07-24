import React, { useState } from "react";
import classnames from "classnames";

import { Button, Control, Label, Box, Title } from "./../../bulma";
import { ModalBackground } from "../../bulma/components/Modal";

export const LogIn = () => {
	const [modalActive, toggleModal] = useState(false);

	const openModal = () => toggleModal(true);
	const closeModal = () => toggleModal(false);

	return (
		<>
			<Button isOutlined isColor="info" onClick={openModal}>
				Log in
			</Button>
			<div
				className={classnames("modal has-text", { "is-active": modalActive })}
			>
				<ModalBackground onClick={closeModal} />
				<div className="modal-content">
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
						</form>
					</Box>
				</div>
				<button
					className="modal-close is-large"
					aria-label="Close login modal"
					onClick={closeModal}
				></button>
			</div>
		</>
	);
};
