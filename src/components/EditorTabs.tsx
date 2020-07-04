import React from "react";

import { Button } from "./../bulma";

export const EditorTabs = () => {
	return (
		<nav className="tabs">
			<div className="container">
				<ul>
					<li className="is-active">
						<Button isColor="primary" isOutlined>
							Terrain
						</Button>
					</li>
					<li>
						<Button>Resource</Button>
					</li>
					<li>
						<Button>Building</Button>
					</li>
					<li>
						<Button>Units</Button>
					</li>
					<li>
						<Button>Continents</Button>
					</li>
					<li>
						<Button>Owner</Button>
					</li>
				</ul>
			</div>
		</nav>
	);
};
