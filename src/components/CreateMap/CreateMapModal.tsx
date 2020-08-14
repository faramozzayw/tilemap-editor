import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";

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

import { useAuthState } from "../../hooks/auth";
import { CREATE_MAP } from "../../graphql";
import { GET_MAPS } from "../../pages/Main";

export interface CreateMapModalProps {
	isActive?: boolean;
	closeModal?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CreateMapModal: React.FC<CreateMapModalProps> = ({
	isActive,
	closeModal,
}) => {
	const [redirectedStatus, setRedirectedStatus] = useState(false);

	const nameRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	const rowRef = useRef<HTMLInputElement>(null);
	const columnRef = useRef<HTMLInputElement>(null);

	const history = useHistory();
	const { user } = useAuthState();

	const [createMap, { loading }] = useMutation(CREATE_MAP);

	const checkboxRedirectHandler = () => setRedirectedStatus(!redirectedStatus);

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		createMap({
			variables: {
				newMap: {
					name: nameRef.current?.value,
					author: user!.username,
					description: descriptionRef.current?.value,
					createData: new Date().toLocaleString(),
					size: {
						row: rowRef.current!.valueAsNumber,
						column: columnRef.current!.valueAsNumber,
					},
				},
			},
			refetchQueries: [{ query: GET_MAPS }],
		}).then((res) => {
			if (redirectedStatus) {
				const id = res.data.createMap.id;
				history.push(`/editor/${id}`);
			}
		});
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
									required
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
						<div className="field">
							<label className="checkbox" onChange={checkboxRedirectHandler}>
								<input type="checkbox" /> Redirect to editor after map creation
							</label>
						</div>
						<div className="field is-grouped">
							<Control>
								<Button
									isColor="success"
									type="submit"
									disabled={loading}
									isLoading={loading}
								>
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
