import React from "react";

import { useStore } from "effector-react";

import { MainNavbar, MapPreviewCard } from "./../components";
import { Hero, HeroHeader, HeroBody } from "./../bulma";

import { mapStore } from "./../store/mapsStore";
import { useAuthState } from "../hooks/auth";

export const Main = () => {
	const store = useStore(mapStore);
	const { isAuthenticated: isAuth } = useAuthState();

	return (
		<Hero isColor="dark" isFullHeight>
			<HeroHeader>
				<MainNavbar />
			</HeroHeader>
			<HeroBody style={{ alignItems: "initial" }}>
				<div className="columns is-multiline is-left" style={{ flex: "1" }}>
					{store.maps.map((mapData, id) => (
						<div className="column is-4" key={id}>
							<MapPreviewCard {...mapData} isAuth={isAuth} />
						</div>
					))}
				</div>
			</HeroBody>
		</Hero>
	);
};
