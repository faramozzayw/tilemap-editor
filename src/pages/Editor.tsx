import React from "react";
import { useParams } from "react-router-dom";
import { useStore } from "effector-react";
import { useQuery, gql } from "@apollo/client";

import { EditorNavbar, EditorTabs, EditorCanvas } from "../components";
import { Hero, HeroBody, HeroHeader, HeroFooter } from "./../bulma";

import { MAP_DATE_TO_EDIT } from "./../query";
import { MapConfig } from "./../types";

import { mapStore } from "./../store/mapsStore";
import { generateGridMatrix } from "../utils";

interface MapConfigData {
	map: MapConfig;
}

export const Editor = () => {
	const { mapID } = useParams();
	const { data, loading, error } = useQuery<MapConfigData>(MAP_DATE_TO_EDIT, {
		variables: { mapID },
	});

	let content = null;

	if (loading) {
		content = <p>Loading...</p>;
	}

	if (error) {
		console.error(error);
	}

	if (data) {
		let { tiles, size } = data.map;
		let mapTiles = generateGridMatrix(tiles, size.row, size.column);

		const map = {
			...data.map,
			tiles: mapTiles,
		};

		content = <EditorCanvas {...map} />;
	}

	return (
		<Hero isFullHeight isColor="black">
			<HeroHeader>
				<EditorNavbar />
			</HeroHeader>

			<HeroBody className="is-paddingless is-relative" id="EditorCanvas-wrap">
				{content}
			</HeroBody>

			<HeroFooter>
				<EditorTabs />
			</HeroFooter>
		</Hero>
	);
};
