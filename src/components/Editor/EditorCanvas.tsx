import React, { useEffect } from "react";

import { CanvasBuild, Tile } from "./../../utils";
import { MapConfig } from "./../../types";

import { Panel } from "../Panels";

export type ISizes = null | {
	width: number;
	height: number;
};

export const EditorCanvas: React.FC<MapConfig> = ({ tiles }) => {
	useEffect(() => {
		const { canvas, camera, scene, engine } = CanvasBuild(
			"#main-canvas",
			tiles as any[],
		);

		engine.runRenderLoop(() => {
			scene.render();
		});

		const resizeHandler = () => {
			engine.resize();
		};

		canvas.addEventListener("resize", resizeHandler, false);
		return () => {
			canvas.removeEventListener("resize", resizeHandler);
		};
	}, []);

	return (
		<>
			<canvas id="main-canvas"></canvas>
			<Panel />
		</>
	);
};
