import React from "react";

import { MainNavbar, MapPreviewCard, NotifyLayout } from "./../components";
import { Hero, HeroHeader, HeroBody } from "./../bulma";

import { useAuthState } from "../hooks/auth";
import { useQuery } from "@apollo/client";
import { MapConfig } from "../types";
import { GET_MAPS } from "./../graphql";

interface MapConfigData {
	maps: MapConfig[];
}

export const Main = () => {
	const { isAuthenticated: isAuth } = useAuthState();

	const { loading, error, data } = useQuery<MapConfigData>(GET_MAPS);

	let content: React.ReactElement | null = null;

	if (loading) content = <p>Loading...</p>;
	if (error) content = <p>Error :(</p>;
	if (data) {
		content = (
			<div className="columns is-multiline is-left" style={{ flex: "1" }}>
				{data.maps?.map((mapData) => (
					<div className="column is-4" key={mapData.id}>
						<MapPreviewCard {...mapData} isAuth={isAuth} />
					</div>
				))}
			</div>
		);
	}

	return (
		<Hero isColor="dark" isFullHeight>
			<HeroHeader>
				<MainNavbar />
			</HeroHeader>
			<HeroBody style={{ alignItems: "initial" }}>{content}</HeroBody>
		</Hero>
	);
};
