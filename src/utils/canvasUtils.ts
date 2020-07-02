import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { FaceNormalsHelper } from "three/examples/jsm/helpers/FaceNormalsHelper";
import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper";

import { $, Tile, range, generateGridMatrix } from "./index";

export const initCanvas = (selector: string) => {
	const canvas = $(selector)[0] as HTMLCanvasElement;
	const { clientHeight, clientWidth } = canvas;
	let entities: any[] = [];
	// let hexagons = [];
	let INTERSECTED = null;

	const mouse = new THREE.Vector2();
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
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(clientWidth, clientHeight);

	const light = new THREE.PointLight(0xffffff);
	light.position.set(-10, 15, 50);
	entities.push(light);

	const controls = new OrbitControls(camera, renderer.domElement);
	const raycaster = new THREE.Raycaster();

	const hexagons = generateGridMatrix(10, 10);

	camera.position.z = 50;
	camera.position.y = 150;
	controls.update();

	entities.push(new THREE.GridHelper(200, 25));

	// const vertexHelpers = hexagons.map(hex => new VertexNormalsHelper(hex, 2, 0x00ff00));
	// entities.push(...vertexHelpers);

	entities.push(...hexagons);
	entities.forEach((entity) => scene.add(entity));

	return {
		canvas,
		mouse,
		scene,
		camera,
		renderer,
		light,
		controls,
		raycaster,
	};
};
