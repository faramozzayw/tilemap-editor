import React, { useEffect } from "react";
import "./styles.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { EditorNavbar, EditorTabs } from "./components";
import { $, createHex } from "./utils";

const App = () => {
	useEffect(() => {
		const canvas = $("canvas")[0] as HTMLCanvasElement;
		const { clientHeight, clientWidth } = canvas;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			clientWidth / clientHeight,
			0.1,
			1000,
		);

		const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
		renderer.setSize(clientWidth, clientHeight);

		const controls = new OrbitControls(camera, renderer.domElement);

		scene.add(createHex());

		camera.position.z = 10;
		controls.update();

		const gridXZ = new THREE.GridHelper(100, 10);
		gridXZ.setColors(new THREE.Color(0xff0000), new THREE.Color(0xffffff));
		scene.add(gridXZ);

		const animate = () => {
			try {
				requestAnimationFrame(animate);
				controls.update();
				// cube.rotation.x += 0.01;
				// cube.rotation.y += 0.01;
				renderer.render(scene, camera);
			} catch (e) {
				return;
			}
		};

		animate();
	}, []);

	return (
		<>
			<section className="hero is-black is-fullheight">
				<div className="hero-head">
					<EditorNavbar />
				</div>

				<div className="hero-body is-paddingless" id="canvas-wrapper">
					<canvas />
				</div>

				<div className="hero-foot">
					<EditorTabs />
				</div>
			</section>
		</>
	);
};

export default App;
