import React from "react";
import { useStore } from "effector-react";

import { EditorTab } from "./EditorTab";
import { editorStore, Instrument } from "../../store/editorStore";

const tabs: Instrument[] = [
	"Terrain",
	"Resource",
	"Building",
	"Units",
	"Continents",
	"Owner",
];

export const EditorTabs = () => {
	const { currentInstrument } = useStore(editorStore);

	return (
		<div className="tabs is-centered is-boxed is-fullwidth">
			<ul>
				{tabs.map((tab) => (
					<EditorTab tabName={tab} isActive={tab === currentInstrument} />
				))}
			</ul>
		</div>
	);
};
