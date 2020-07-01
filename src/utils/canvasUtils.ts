import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { FaceNormalsHelper } from "three/examples/jsm/helpers/FaceNormalsHelper";
import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper";

import { $ } from "./index";

export const createHex = (color?: number | string) => {
	const radiusTop = 5.0;
	const radiusBottom = 5.5;
	const height = 1.0;
	const radialSegments = 6;
	const geometry = new THREE.CylinderBufferGeometry(
		radiusTop,
		radiusBottom,
		height,
		radialSegments,
	);

	const material = new THREE.MeshPhongMaterial({ color: color ?? 0x4c37a6 });
	const hex = new THREE.Mesh(geometry, material);

	return hex;
};

export const initCanvas = (selector: string) => {
	const canvas = $(selector)[0] as HTMLCanvasElement;
	const { clientHeight, clientWidth } = canvas;
	let entities: any[] = [];
	let hexagons = [];
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
		antialias: false,
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(clientWidth, clientHeight);

	const light = new THREE.PointLight(0xffffff);
	light.position.set(-10, 15, 50);
	entities.push(light);

	const controls = new OrbitControls(camera, renderer.domElement);
	const raycaster = new THREE.Raycaster();

	hexagons.push(createHex());
	hexagons.push(createHex(0xfff).translateZ(8.5).translateX(5));
	hexagons.push(createHex(0xdedede).translateX(10));

	camera.position.z = 25;
	camera.position.y = 45;
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
