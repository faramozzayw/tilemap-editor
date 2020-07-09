import React from "react";
import { useParams } from "react-router-dom";
import { useStore } from "effector-react";

import { EditorNavbar, EditorTabs, EditorCanvas } from "../components";
import { Hero, HeroBody, HeroHeader, HeroFooter } from "./../bulma";

import { mapStore } from "./../store/mapsStore";
import { MapID } from "./../types";

export const Editor = () => {
	const { mapID } = useParams();
	const { maps } = useStore(mapStore);

	const currentMap = maps.find(({ id }) => id === mapID);

	if (!currentMap) {
		return null;
	}

	return (
		<Hero isFullHeight isColor="black">
			<HeroHeader>
				<EditorNavbar />
			</HeroHeader>

			<HeroBody className="is-paddingless" id="EditorCanvas-wrap">
				<EditorCanvas {...currentMap} />
			</HeroBody>

			<HeroFooter>
				<EditorTabs />
			</HeroFooter>
		</Hero>
	);
};
