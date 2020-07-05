import React from "react";
import { MainNavbar } from "./../components";

import { Hero, HeroHeader } from "./../bulma";

export const Main = () => (
	<Hero isColor="dark" isFullHeight>
		<HeroHeader>
			<MainNavbar />
		</HeroHeader>
	</Hero>
);
