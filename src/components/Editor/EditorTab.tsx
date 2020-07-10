import React from "react";
import classnames from "classnames";

import { changeInstrument, Instrument } from "./../../store/editorStore";

export interface EditorTabProps {
	isActive?: boolean;
	tabName: Instrument;
}

export const EditorTab: React.FC<EditorTabProps> = ({ isActive, tabName }) => {
	const onClick = () => {
		changeInstrument(tabName);
	};

	return (
		<li
			className={classnames({
				"is-active": isActive,
			})}
		>
			<a role="button" onClick={onClick}>
				<span>{tabName}</span>
			</a>
		</li>
	);
};
