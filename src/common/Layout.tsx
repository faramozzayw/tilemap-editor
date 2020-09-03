import React from "react";

import { Hero, HeroHeader, HeroBody } from "../bulma";
import { MainNavbar } from "../components";

export const Layout: React.FC<HeroBody<HTMLElement>> = ({
	children,
	...props
}) => (
	<Hero isColor="dark" isFullHeight>
		<HeroHeader>
			<MainNavbar />
		</HeroHeader>
		<HeroBody {...props}>{children}</HeroBody>
	</Hero>
);
