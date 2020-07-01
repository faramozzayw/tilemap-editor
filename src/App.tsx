import React, { useEffect } from "react";
import "./styles.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { FaceNormalsHelper } from "three/examples/jsm/helpers/FaceNormalsHelper";
import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper";

import { EditorNavbar, EditorTabs } from "./components";
import { $, createHex } from "./utils";

const App = () => {
	useEffect(() => {
		const canvas = $("canvas")[0] as HTMLCanvasElement;
		const { clientHeight, clientWidth } = canvas;
		let entities: any[] = [];
		let hexagons = [];

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			clientWidth / clientHeight,
			0.1,
			1000,
		);

		const renderer = new THREE.WebGLRenderer({
			canvas,
			alpha: true,
			antialias: false,
		});
		renderer.setSize(clientWidth, clientHeight);

		var light = new THREE.PointLight(0xffffff);
		light.position.set(-10, 15, 50);
		entities.push(light);

		const controls = new OrbitControls(camera, renderer.domElement);

		hexagons.push(createHex());
		hexagons.push(createHex(0xfff).translateZ(8.5).translateX(5));
		hexagons.push(createHex(0xdedede).translateX(10));

		camera.position.z = 25;
		camera.position.y = 45;
		controls.update();

		const gridXZ = new THREE.GridHelper(200, 25);
		entities.push(gridXZ);

		// const vertexHelpers = hexagons.map(hex => new VertexNormalsHelper(hex, 2, 0x00ff00));
		// entities.push(...vertexHelpers);

		entities.push(...hexagons);
		entities.forEach((entity) => scene.add(entity));

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
