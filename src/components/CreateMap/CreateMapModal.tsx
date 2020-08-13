import React, { useRef } from "react";
import classnames from "classnames";
import { useHistory } from "react-router-dom";
import { uuid } from "uuidv4";

import {
	Button,
	Control,
	Label,
	Box,
	ModalBackground,
	Modal,
	ModalContent,
	ModalClose,
	TextArea,
} from "./../../bulma";

import { createMap } from "./../../store/mapsStore";
import { useAuthState } from "../../hooks/auth";

export interface CreateMapModalProps {
	isActive?: boolean;
	closeModal?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CreateMapModal: React.FC<CreateMapModalProps> = ({
	isActive,
	closeModal,
}) => {
	const nameRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	const rowRef = useRef<HTMLInputElement>(null);
	const columnRef = useRef<HTMLInputElement>(null);

	const history = useHistory();
	const { user } = useAuthState();

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const name = nameRef.current?.value ?? "";

		if (name.trim() === "") {
			return alert("You must enter map name");
		}

		const id = uuid();

		try {
			createMap({
				name,
				author: user!.username,
				id,
				description: descriptionRef.current?.value,
				createData: new Date(),
				size: {
					row: rowRef.current!.valueAsNumber,
					column: columnRef.current!.valueAsNumber,
				},
				tiles: [],
			});

			history.push(`/editor/${id}`);
		} catch (e) {}
	};

	return (
		<Modal className="has-text" isActive={isActive}>
			<ModalBackground />
			<ModalContent>
				<Box>
					<form onSubmit={submitHandler}>
						<div className="field">
							<Label>Map name</Label>
							<Control>
								<input
									className="input"
									type="text"
									placeholder="Input map name"
									ref={nameRef}
								/>
							</Control>
						</div>
						<div className="field">
							<Label>Map size</Label>
							<div className="field has-addons">
								<Control isExpanded>
									<input
										className="input"
										type="number"
										placeholder="Column"
										ref={columnRef}
										defaultValue="20"
										min="0"
										max="500"
									/>
								</Control>
								<Control isExpanded>
									<input
										className="input"
										type="number"
										placeholder="Row"
										ref={rowRef}
										defaultValue="20"
										min="0"
										max="500"
									/>
								</Control>
							</div>
						</div>
						<div className="field">
							<Label>Description</Label>
							<Control>
								<TextArea
									ref={descriptionRef}
									placeholder="Enter some description about your map"
								/>
							</Control>
						</div>
						<div className="field is-grouped">
							<Control>
								<Button isColor="success" type="submit">
									Create map
								</Button>
							</Control>
							<Control>
								<Button isLink isLight onClick={closeModal}>
									Cancel
								</Button>
							</Control>
						</div>
					</form>
				</Box>
			</ModalContent>
			<ModalClose onClick={closeModal} isSize="large" />
		</Modal>
	);
};

export default CreateMapModal;
