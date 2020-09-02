import React from "react";
import { Hero, HeroHeader, HeroBody } from "../bulma";
import { MainNavbar } from "../components";
import { useEditMapQuery } from "../types/graphql";
import { useParams } from "react-router-dom";

export const Map = () => {
	const { mapID } = useParams();
	const { loading } = useEditMapQuery({
		variables: { mapID },
	});

	return (
		<Hero isColor="dark" isFullHeight>
			<HeroHeader>
				<MainNavbar />
			</HeroHeader>
			<HeroBody>aasdads</HeroBody>
		</Hero>
	);
};
