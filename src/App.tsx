import React, { useEffect } from "react";
import "./styles.css";

import * as THREE from "three";

import { EditorNavbar, EditorTabs } from "./components";
import { $ } from "./utils";

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
		const renderer = new THREE.WebGLRenderer({ canvas });
		renderer.setSize(clientWidth, clientHeight);

		const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
		const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

		scene.add(cube);

		// const circleGeometry = new THREE.CircleGeometry(1, 6);
		// const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
		// const circle = new THREE.Mesh(circleGeometry, circleMaterial);
		// scene.add(circle);

		camera.position.z = 10;

		const animate = () => {
			try {
				requestAnimationFrame(animate);
				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;
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
