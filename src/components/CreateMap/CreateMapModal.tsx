import React from "react";
import { useFormik } from "formik";

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
} from "@faramo.zayw/reabulma";

import { useAuthState } from "../../hooks/auth";
import { addNotification } from "../../store/notificationStore";
import { useCreateMapMutation } from "../../types/graphql";

export interface CreateMapModalProps {
	isActive?: boolean;
	closeModal?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CreateMapModal: React.FC<CreateMapModalProps> = ({
	isActive,
	closeModal,
}) => {
	const { user } = useAuthState();

	const formik = useFormik({
		initialValues: {
			name: "",
			description: "",
			row: 20,
			column: 20,
		},
		onSubmit: (values) => {
			const { name } = values;
			const nameValid = Boolean(name.trim());

			if (nameValid) {
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
				});
			} else {
				addNotification({
					type: "warning",
					message: "Incorrect! Check your data and try again",
				});
			}
		},
	});

	const [createMap, { loading }] = useCreateMapMutation({
		onCompleted: () => {
			addNotification({
				type: "success",
				message: "Map creation was successful 🎉",
			});
		},
		onError: (err) =>
			addNotification({
				type: "danger",
				message: err.message,
			}),
	});

	return (
		<Modal className="has-text" isActive={isActive}>
			<ModalBackground onClick={closeModal} />
			<ModalContent>
				<Box>
					<form onSubmit={formik.handleSubmit}>
						<div className="field">
							<Label>Map name</Label>
							<Control>
								<input
									min="3"
									max="45"
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
									max="400"
									value={formik.values.description}
									onChange={formik.handleChange}
									name="description"
									placeholder="Enter some description about your map"
								/>
							</Control>
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
