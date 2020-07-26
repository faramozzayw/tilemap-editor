import React from "react";
import { useStore } from "effector-react";
import { editorStore, setCurrentTerrain } from "../../store/editorStore";

import { PanelBlock, PanelIcon } from "./../../bulma";
import { BaseTerrainEnum, BaseTerrain } from "../../types";

export const TerrainPanel = ({ isOpenPanel }: { isOpenPanel?: boolean }) => {
	const { /* currentInstrument, */ currentBaseTerrain } = useStore(editorStore);

	return (
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
								value={currentBaseTerrain}
								onChange={(e) => {
									setCurrentTerrain(e.target.value as BaseTerrain);
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
					<PanelBlock className="is-radiusless">
						<button className="button is-link is-outlined is-fullwidth">
							Reset all
						</button>
					</PanelBlock>
				</>
			)}
		</div>
	);
};
