import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useMutation } from "@apollo/client";

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
import { CREATE_MAP, GET_MAPS, GET_MAPS_BY_USER } from "../../graphql";
import { addNotification } from "../../store/notificationStore";
import { useFormik } from "formik";
import { useCreateMapMutation } from "../../types/graphql";

export interface CreateMapModalProps {
	isActive?: boolean;
	closeModal?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CreateMapModal: React.FC<CreateMapModalProps> = ({
	isActive,
	closeModal,
}) => {
	const [redirectedStatus, setRedirectedStatus] = useState(false);
	const history = useHistory();
	const { user } = useAuthState();

	const formik = useFormik({
		initialValues: {
			name: "",
			description: "",
			row: 20,
			column: 20,
		},
		onSubmit: (values) =>
			createMap({
				variables: {
					newMap: {
						name: values.name,
						author: user!.username,
						description: values.description,
						size: {
							row: Math.floor(values.row),
							column: Math.floor(values.column),
						},
					},
				},
			}),
	});

	const [createMap, { loading }] = useCreateMapMutation({
		onCompleted: ({ createMap }) => {
			addNotification({
				type: "success",
				message: "Map creation was successful 🎉",
			});

			if (redirectedStatus) {
				const id = createMap.id;
				history.push(`/editor/${id}`);
			}
		},
		onError: (err) =>
			addNotification({
				type: "danger",
				message: err.message,
			}),
		refetchQueries: [
			{ query: GET_MAPS },
			{
				query: GET_MAPS_BY_USER,
				variables: {
					username: user?.username,
				},
			},
		],
	});

	const checkboxRedirectHandler = () => setRedirectedStatus(!redirectedStatus);

	return (
		<Modal className="has-text" isActive={isActive}>
			<ModalBackground />
			<ModalContent>
				<Box>
					<form onSubmit={formik.handleSubmit}>
						<div className="field">
							<Label>Map name</Label>
							<Control>
								<input
									value={formik.values.name}
									onChange={formik.handleChange}
									name="name"
									className="input"
									type="text"
									placeholder="Input map name"
									required
								/>
							</Control>
						</div>
						<div className="field">
							<Label>Map size</Label>
							<div className="field has-addons">
								<Control isExpanded>
									<input
										value={formik.values.column}
										onChange={formik.handleChange}
										name="column"
										className="input"
										type="number"
										placeholder="Column"
										min="0"
										max="200"
									/>
								</Control>
								<Control isExpanded>
									<input
										value={formik.values.row}
										onChange={formik.handleChange}
										name="row"
										className="input"
										type="number"
										placeholder="Row"
										min="0"
										max="200"
									/>
								</Control>
							</div>
						</div>
						<div className="field">
							<Label>Description</Label>
							<Control>
								<TextArea
									value={formik.values.description}
									onChange={formik.handleChange}
									name="description"
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
