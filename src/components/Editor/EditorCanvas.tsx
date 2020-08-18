import React, { useEffect } from "react";

import { CanvasBuild } from "./../../utils";
import { MapConfig } from "./../../types";

import { Panel } from "../Panels";
import { setCurrentMapID } from "../../store/editorStore";

export type ISizes = null | {
	width: number;
	height: number;
};

export const EditorCanvas: React.FC<MapConfig> = ({ id, tiles }) => {
	useEffect(() => {
		const { /* canvas, camera, */ scene, engine } = CanvasBuild(
			"#main-canvas",
			tiles as any[],
		);

		setCurrentMapID(id);

		engine.runRenderLoop(() => {
			scene.render();
		});

		const resizeHandler = () => {
			engine.resize();
		};

		window.addEventListener("resize", resizeHandler, false);
		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, [tiles, id]);

	return (
		<>
			<canvas id="main-canvas"></canvas>
			<Panel />
		</>
	);
};
