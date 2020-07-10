import React from "react";
import { useStore } from "effector-react";

import "./index.css";

import {
	Panel as BulmaPanel,
	PanelHeading,
	PanelBlock,
	PanelIcon,
} from "./../../bulma";
import { editorStore } from "./../../store/editorStore";

export const Panel = ({}) => {
	const { currentInstrument } = useStore(editorStore);

	return (
		<BulmaPanel isColor="info" className="canvas-panel">
			<PanelHeading>{currentInstrument}</PanelHeading>
			<PanelBlock>
				<p className="control has-icons-left">
					<input className="input" type="text" placeholder="Search" />
					<span className="icon is-left">
						<i className="fas fa-search" aria-hidden="true"></i>
					</span>
				</p>
			</PanelBlock>
			<PanelBlock isActive>
				<PanelIcon icon="fas fa-book" />
				bulma
			</PanelBlock>
			<PanelBlock>
				<PanelIcon icon="fas fa-book" />
				marksheet
			</PanelBlock>
			<PanelBlock>
				<PanelIcon icon="fas fa-book" />
				minireset.css
			</PanelBlock>
			<PanelBlock>
				<PanelIcon icon="fas fa-book" />
				jgthms.github.io
			</PanelBlock>
			<PanelBlock>
				<PanelIcon icon="fas fa-code-branch" />
				daniellowtw/infboard
			</PanelBlock>
			<PanelBlock>
				<PanelIcon icon="fas fa-code-branch" />
				mojs
			</PanelBlock>
			<PanelBlock>
				<input type="checkbox" />
				remember me
			</PanelBlock>
			<PanelBlock>
				<button className="button is-link is-outlined is-fullwidth">
					Reset all
				</button>
			</PanelBlock>
		</BulmaPanel>
	);
};
