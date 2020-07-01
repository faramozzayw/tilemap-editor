import React, { useEffect } from "react";

import { initCanvas } from "./../utils";

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

		const onMouseMove = (event: any) => {
			event.preventDefault();

			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(event.clientY / canvas.clientHeight) * 2 + 1;
		};

		const onWindowResize = () => {
			camera.aspect = window.innerWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, canvas.clientHeight);
		};

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

		canvas.addEventListener("mousemove", onMouseMove, false);
		window.addEventListener("resize", onWindowResize, false);
		return () => {
			canvas.removeEventListener("mousemove", onMouseMove);
			canvas.removeEventListener("resize", onWindowResize);
		};
	}, []);

	return <canvas id="main-canvas" />;
};
