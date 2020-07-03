import React from "react";

export const EditorTabs = () => {
	return (
		<nav className="tabs">
			<div className="container">
				<ul>
					<li className="is-active">
						<button>Terrain</button>
					</li>
					<li>
						<button>Resource</button>
					</li>
					<li>
						<button>Building</button>
					</li>
					<li>
						<button>Units</button>
					</li>
					<li>
						<button>Continents</button>
					</li>
					<li>
						<button>Owner</button>
					</li>
				</ul>
			</div>
		</nav>
	);
};
