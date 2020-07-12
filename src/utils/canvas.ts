import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper";
import { $ } from "./index";
// import { Object3D } from "three";

export const CanvasBuild = (selector: string, tiles: any[] = []) => {
	const canvas = $(selector)[0] as HTMLCanvasElement;

	if (!canvas) {
		throw Error("Check your selector");
	}

	const { offsetWidth: canvasWidth, offsetHeight: canvasHeight } = canvas;
	let entities: any[] = [];

	const mouse = new THREE.Vector3(9999, 9999);
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		75,
		canvasWidth / canvasHeight,
		0.1,
		1000,
	);

	const renderer = new THREE.WebGLRenderer({
		canvas,
		alpha: true,
	});

	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(canvasWidth, canvasHeight);

	const light = new THREE.PointLight(0xffffff);
	light.position.set(-10, 15, 50);
	entities.push(light);

	const controls = new OrbitControls(camera, renderer.domElement);
	const raycaster = new THREE.Raycaster();

	camera.position.setY(150);
	camera.position.setZ(50);

	controls.update();

	entities.push(new THREE.GridHelper(200, 25));

	entities.push(...tiles);

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
