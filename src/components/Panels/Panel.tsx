import React, { useState } from "react";
import { useStore } from "effector-react";
import classnames from "classnames";

import "./index.css";

import { Panel as BulmaPanel, PanelHeading, Button } from "./../../bulma";
import { editorStore } from "./../../store/editorStore";
import { TerrainPanel } from "./TerrainPanel";

export const Panel = () => {
	const { currentInstrument } = useStore(editorStore);
	const [isOpenPanel, setOpenPanel] = useState(true);

	const togglePanel = () => setOpenPanel(!isOpenPanel);

	const getCurrentPanel = () => {
		switch (currentInstrument as string) {
			case "Terrain":
				return <TerrainPanel isOpenPanel={isOpenPanel} />;
			default:
				return null;
		}
	};

	return (
		<BulmaPanel isColor="info" className="canvas-panel">
			<PanelHeading
				className={classnames({
					"canvas-panel-active": isOpenPanel,
				})}
			>
				{currentInstrument}
				<Button
					isColor="light"
					isSize="small"
					className="is-pulled-right"
					onClick={togglePanel}
				>
					<strong>{isOpenPanel ? "Close" : "Open"} panel</strong>
				</Button>
			</PanelHeading>
			{getCurrentPanel()}
		</BulmaPanel>
	);
};
