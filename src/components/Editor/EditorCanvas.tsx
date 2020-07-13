import React, { useEffect } from "react";

import { CanvasBuild, Tile } from "./../../utils";
import { MapConfig } from "./../../types";

import { onMouseMove, onWindowResize } from "./../../utils/canvas";

import { Panel } from "../Panels";

export type ISizes = null | {
	width: number;
	height: number;
};

export const EditorCanvas: React.FC<MapConfig> = ({ tiles }) => {
	useEffect(() => {
		const map = tiles?.map(
			(elem) =>
				new Tile({
					position: elem.position,
				}),
		);
		const {
			canvas,
			controls,
			mouse,
			camera,
			renderer,
			scene,
			raycaster,
		} = CanvasBuild("#main-canvas", map ?? []);

		const animate = () => {
			try {
				requestAnimationFrame(animate);
				raycaster.setFromCamera(mouse, camera);

				controls.update();
				renderer.render(scene, camera);
			} catch (e) {
				return;
			}
		};

		animate();

		const onMouseMoveHandler = onMouseMove(mouse, canvas);
		const onWindowResizeHandler = onWindowResize(camera, canvas, renderer);

		canvas.addEventListener("mousemove", onMouseMoveHandler, false);
		window.addEventListener("resize", onWindowResizeHandler, false);
		return () => {
			canvas.removeEventListener("mousemove", onMouseMoveHandler);
			canvas.removeEventListener("resize", onWindowResizeHandler);
		};
	}, []);

	return (
		<>
			<canvas id="main-canvas"></canvas>
			<Panel />
		</>
	);
};
