import * as THREE from "three";
import { WebGLRenderer, PerspectiveCamera, Vector3, Object3D } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { $ } from "./index";

export const onMouseMove = (mouse: Vector3, canvas: HTMLCanvasElement) => (
	event: MouseEvent,
) => {
	event.preventDefault();

	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / canvas.clientHeight) * 2 + 1;
};

export const onWindowResize = (
	camera: PerspectiveCamera,
	canvas: HTMLCanvasElement,
	renderer: WebGLRenderer,
) => () => {
	camera.aspect = window.innerWidth / canvas.clientHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, canvas.clientHeight);
};

export const CanvasBuild = (selector: string, tiles: Object3D[] = []) => {
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
