import React from "react";
import classnames from "classnames";
import { Box } from "../bulma/elements/box";
import { Button, Control, Label } from "./../bulma";

export interface CreateMapModalProps {
	isActive?: boolean;
	closeModal?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const CreateMapModal: React.FC<CreateMapModalProps> = ({
	isActive,
	closeModal,
}) => (
	<div className={classnames("modal", { "is-active": isActive })}>
		<div className="modal-background"></div>
		<div className="modal-content">
			<Box>
				<form>
					<div className="field">
						<Label>Map name</Label>
						<Control>
							<input className="input" type="text" placeholder="Text input" />
						</Control>
					</div>
					<div className="field">
						<Label>Map size</Label>
						<div className="field has-addons">
							<Control isExpanded>
								<input className="input" type="text" placeholder="Column" />
							</Control>
							<Control isExpanded>
								<input className="input" type="text" placeholder="Row" />
							</Control>
						</div>
					</div>
					<div className="field is-grouped">
						<Control>
							<Button isLink>Submit</Button>
						</Control>
						<Control>
							<Button isLink isLight>
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
