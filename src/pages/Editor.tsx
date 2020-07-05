import React from "react";

import { EditorNavbar, EditorTabs, EditorCanvas } from "../components";
import { Hero, HeroBody, HeroHeader, HeroFooter } from "./../bulma";

export const Editor = () => {
	return (
		<Hero isFullHeight isColor="black">
			<HeroHeader>
				<EditorNavbar />
			</HeroHeader>

			<HeroBody className="is-paddingless" id="EditorCanvas-wrap">
				<EditorCanvas />
			</HeroBody>

			<HeroFooter>
				<EditorTabs />
			</HeroFooter>
		</Hero>
	);
};
