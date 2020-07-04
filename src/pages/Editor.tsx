import React from "react";

import { EditorNavbar, EditorTabs, EditorCanvas } from "../components";

export const Editor = () => {
	return (
		<>
			<section className="hero is-black is-fullheight">
				<div className="hero-head">
					<EditorNavbar />
				</div>

				<div className="hero-body is-paddingless" id="EditorCanvas-wrap">
					<EditorCanvas />
				</div>

				<div className="hero-foot">
					<EditorTabs />
				</div>
			</section>
		</>
	);
};
