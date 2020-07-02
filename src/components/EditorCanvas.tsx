import React, { useEffect } from "react";
import * as THREE from "three";

import { initCanvas, randomColor, Tile } from "./../utils";

export const EditorCanvas = () => {
	useEffect(() => {
		let {
			canvas,
			mouse,
			scene,
			camera,
			renderer,
			//    light,
			controls,
			raycaster,
		} = initCanvas("#main-canvas");

		const handleRaycast = (event: any) => {
			event.preventDefault();

			mouse.x = (event.clientX / canvas.clientWidth) * 2 - 1;
			mouse.y = -(event.clientY / canvas.clientHeight) * 2 + 1;
		};

		const onWindowResize = () => {
			camera.aspect = window.innerWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, canvas.clientHeight);
		};

		console.log(scene.children);

		const hexagons = scene.children.filter(
			(children) => children instanceof Tile,
		);

		let intersectHexagon: Tile | null = null;

		const animate = () => {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);

			raycaster.setFromCamera(mouse, camera);

			const intersects = raycaster.intersectObjects(hexagons, true);
			if (intersects.length > 0) {
				intersectHexagon = intersects[0].object.parent;
				// @ts-ignore
				let b = intersects[0].object.parent.scale.x;
				// @ts-ignore
				intersects[0].object.parent.scale.x = b === 1 ? 0.5 : 1;
			}
		};

		animate();

		canvas.addEventListener("mousemove", handleRaycast, false);
		window.addEventListener("resize", onWindowResize, false);
		return () => {
			canvas.removeEventListener("mousemove", handleRaycast);
			canvas.removeEventListener("resize", onWindowResize);
		};
	}, []);

	return <canvas id="main-canvas" />;
};
