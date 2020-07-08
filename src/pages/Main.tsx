import React from "react";

import { useStore } from "effector-react";

import { MainNavbar, MapPreviewCard } from "./../components";
import { Hero, HeroHeader, HeroBody } from "./../bulma";

import { mapStore } from "./../store/mapsStore";

export const Main = () => {
	const store = useStore(mapStore);

	return (
		<Hero isColor="dark" isFullHeight>
			<HeroHeader>
				<MainNavbar />
			</HeroHeader>
			<HeroBody style={{ alignItems: "initial" }}>
				<div className="columns is-multiline is-left" style={{ flex: "1" }}>
					{store.maps.map((mapData, id) => (
						<div className="column is-4">
							<MapPreviewCard key={id} {...mapData} />
						</div>
					))}
				</div>
			</HeroBody>
		</Hero>
	);
};
