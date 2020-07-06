import React from "react";

export const EditorTabs = () => {
	return (
		<div className="tabs is-centered is-boxed is-fullwidth">
			<ul>
				<li className="is-active">
					<a role="button">
						<span>Terrain</span>
					</a>
				</li>
				<li>
					<a role="button">
						<span>Resource</span>
					</a>
				</li>
				<li>
					<a role="button">
						<span>Building</span>
					</a>
				</li>
				<li>
					<a role="button">
						<span>Units</span>
					</a>
				</li>
				<li>
					<a role="button">
						<span>Continents</span>
					</a>
				</li>
				<li>
					<a role="button">
						<span>Owner</span>
					</a>
				</li>
			</ul>
		</div>
	);
};
