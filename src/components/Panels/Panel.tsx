import React, { useState } from "react";
import { useStore } from "effector-react";
import classnames from "classnames";

import "./index.css";

import {
	Panel as BulmaPanel,
	PanelHeading,
	PanelBlock,
	PanelIcon,
	Button,
} from "./../../bulma";
import { editorStore, setCurrentTerrain } from "./../../store/editorStore";

import { BaseTerrainEnum } from "./../../types";

export const Panel = () => {
	const { currentInstrument } = useStore(editorStore);
	const [isOpenPanel, setOpenPanel] = useState(true);

	const togglePanel = () => setOpenPanel(!isOpenPanel);

	return (
		<BulmaPanel isColor="info" className="canvas-panel">
			<PanelHeading
				className={classnames({
					"canvas-panel-active": isOpenPanel,
				})}
			>
				{currentInstrument}
				<Button
					isColor="light"
					isSize="small"
					className="is-pulled-right"
					onClick={togglePanel}
				>
					<strong>{isOpenPanel ? "Close" : "Open"} panel</strong>
				</Button>
			</PanelHeading>
			<div className="panel-body">
				{isOpenPanel && (
					<>
						<PanelBlock className="panel-select">
							<p className="control has-icons-left">
								<input className="input" type="text" placeholder="Search" />
								<span className="icon is-left">
									<i className="fas fa-search" aria-hidden="true"></i>
								</span>
							</p>
						</PanelBlock>
						<PanelBlock isActive className="panel-select">
							<PanelIcon icon="fas fa-book" />
							Base terrain
							<div className="select">
								<select
									onChange={(e) => {
										// @ts-ignore
										setCurrentTerrain(e.target.value);
									}}
								>
									{Object.keys(BaseTerrainEnum).map((terrain) => (
										<option value={terrain} key={terrain}>
											{terrain}
										</option>
									))}
								</select>
							</div>
						</PanelBlock>
						<PanelBlock className="panel-select">
							<PanelIcon icon="fas fa-book" />
							Feature terrain
							<div className="select">
								<select>
									{Object.keys(BaseTerrainEnum).map((terrain) => (
										<option value={terrain} key={terrain}>
											{terrain}
										</option>
									))}
								</select>
							</div>
						</PanelBlock>
						<PanelBlock>
							<PanelIcon icon="fas fa-book" />
							minireset.css
						</PanelBlock>
						<PanelBlock>
							<PanelIcon icon="fas fa-book" />
							jgthms.github.io
						</PanelBlock>
						<PanelBlock>
							<PanelIcon icon="fas fa-code-branch" />
							daniellowtw/infboard
						</PanelBlock>
						<PanelBlock>
							<PanelIcon icon="fas fa-code-branch" />
							mojs
						</PanelBlock>
						<PanelBlock>
							<input type="checkbox" />
							remember me
						</PanelBlock>
						<PanelBlock className="is-radiusless">
							<button className="button is-link is-outlined is-fullwidth">
								Reset all
							</button>
						</PanelBlock>
					</>
				)}
			</div>
		</BulmaPanel>
	);
};
