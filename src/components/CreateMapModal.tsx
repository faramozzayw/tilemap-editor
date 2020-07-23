import React, { useRef } from "react";
import classnames from "classnames";
import { useHistory } from "react-router-dom";
import { uuid } from "uuidv4";

import { Button, Control, Label, Box } from "./../bulma";

import { createMap } from "./../store/mapsStore";

export interface CreateMapModalProps {
	isActive?: boolean;
	closeModal?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const CreateMapModal: React.FC<CreateMapModalProps> = ({
	isActive,
	closeModal,
}) => {
	const nameRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	const rowRef = useRef<HTMLInputElement>(null);
	const columnRef = useRef<HTMLInputElement>(null);

	const history = useHistory();

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
				author: "Anonim",
				id,
				description: descriptionRef.current?.value,
				create_data: new Date(),
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
		<div className={classnames("modal has-text", { "is-active": isActive })}>
			<div className="modal-background"></div>
			<div className="modal-content">
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
									/>
								</Control>
							</div>
						</div>
						<div className="field">
							<Label>Description</Label>
							<Control>
								<textarea
									className="textarea"
									ref={descriptionRef}
									placeholder="Enter some description about your map"
								></textarea>
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
			</div>
			<button
				className="modal-close is-large"
				aria-label="close"
				onClick={closeModal}
			></button>
		</div>
	);
};
