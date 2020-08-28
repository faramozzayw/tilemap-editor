import {
	Scene,
	Engine,
	Vector3,
	HemisphericLight,
	ArcRotateCamera,
	SceneLoader,
} from "babylonjs";

import "babylonjs-loaders";
import { $, Tile } from "./index";

export const CanvasBuild = (selector: string, tiles: any[] = []) => {
	const canvas = $(selector)[0] as HTMLCanvasElement;

	if (!canvas) {
		throw Error("Check your selector");
	}

	const antialias = true;
	const engine = new Engine(canvas, antialias, {
		preserveDrawingBuffer: true,
		stencil: true,
	});

	const scene = new Scene(engine);
	const camera = new ArcRotateCamera(
		"camera1",
		Math.PI / 2,
		0,
		100,
		new Vector3(0, 2, -10),
		scene,
	);

	camera.upperBetaLimit = 1;
	camera.wheelPrecision = 5;
	camera.panningSensibility = 5;
	camera.panningInertia = 0;
	camera.allowUpsideDown = false;

	camera.upperRadiusLimit = 50;

	camera.setTarget(Vector3.Zero());
	camera.attachControl(canvas, true);

	const light = new HemisphericLight("light1", new Vector3(1, 1, 1), scene);

	SceneLoader.LoadAssetContainer(
		"/assets/",
		"tile.gltf",
		scene,
		(tileModel) => {
			let root = tileModel.createRootMesh();

			tiles.map((tile) => {
				const position = new Vector3(...tile.position);

				return new Tile({
					position,
					scene,
					metadata: tile,
					rootMesh: root.clone(),
				});
			});
		},
	);

	return {
		canvas,
		scene,
		camera,
		light,
		engine,
	};
};
