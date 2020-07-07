import React from "react";
import { MainNavbar, MapPreviewCard } from "./../components";

import { Hero, HeroHeader, HeroBody } from "./../bulma";

export const Main = () => (
	<Hero isColor="dark" isFullHeight>
		<HeroHeader>
			<MainNavbar />
		</HeroHeader>
		<HeroBody>
			<div className="columns is-multiline is-centered">
				{[1, 2, 3, 4, 5, 6].map((_, id) => (
					<div className="column is-3">
						<MapPreviewCard key={id} />
					</div>
				))}
			</div>
		</HeroBody>
	</Hero>
);
