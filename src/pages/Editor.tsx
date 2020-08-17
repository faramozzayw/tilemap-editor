import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import { EditorNavbar, EditorTabs, EditorCanvas } from "../components";
import { Hero, HeroBody, HeroHeader, HeroFooter } from "./../bulma";

import { GET_MAP_DATA } from "./../graphql";
import { MapConfig } from "./../types";

import { generateGridMatrix } from "../utils";

import "./Editor.module.css";

interface MapConfigData {
	map: MapConfig;
}

export const Editor = () => {
	const { mapID } = useParams();
	const { data, loading, error } = useQuery<MapConfigData>(GET_MAP_DATA, {
		variables: { mapID },
		partialRefetch: true,
	});

	useEffect(() => {
		const html = document.querySelector("html");
		html?.classList.add("editor-page");

		return () => html?.classList.remove("editor-page");
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
