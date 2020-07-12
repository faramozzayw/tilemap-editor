import React, { useEffect } from "react";

import { CanvasBuild, Tile } from "./../../utils";
import { MapConfig } from "./../../types";

import { Panel } from "../Panels";
import { WebGLRenderer, PerspectiveCamera, Vector3 } from "three";

export type ISizes = null | {
	width: number;
	height: number;
};

export const EditorCanvas: React.FC<MapConfig> = ({ tiles }) => {
	const onMouseMove = (mouse: Vector3, canvas: HTMLCanvasElement) => (
		event: any,
	) => {
		event.preventDefault();

		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / canvas.clientHeight) * 2 + 1;
	};

	const onWindowResize = (
		camera: PerspectiveCamera,
		canvas: HTMLCanvasElement,
		renderer: WebGLRenderer,
	) => () => {
		camera.aspect = window.innerWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, canvas.clientHeight);
	};

	useEffect(() => {
		const map = tiles?.map(
			(elem) =>
				new Tile({
					position: elem.position,
				}),
		);
		const { canvas, controls, mouse, camera, renderer, scene } = CanvasBuild(
			"#main-canvas",
			map ?? [],
		);

		const animate = () => {
			try {
				requestAnimationFrame(animate);
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
