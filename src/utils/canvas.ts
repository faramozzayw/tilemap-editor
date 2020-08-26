import {
	Scene,
	Engine,
	Vector3,
	HemisphericLight,
	ArcRotateCamera,
	Mesh,
	StandardMaterial,
	Color3,
	SceneLoader,
	InstancedMesh,
} from "babylonjs";

import "babylonjs-loaders";
import { $, Tile } from "./index";
import { TileMetadata } from "./Tile";

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

	camera.upperBetaLimit = 2;
	camera.wheelPrecision = 5;
	camera.panningSensibility = 5;
	camera.panningInertia = 0.5;
	camera.setTarget(new Vector3(0, 0, 30));
	camera.attachControl(canvas, false);

	const light = new HemisphericLight("light1", new Vector3(1, 1, 1), scene);

	SceneLoader.LoadAssetContainer(
		"/assets/",
		"tile.gltf",
		scene,
		(tileModel) => {
			let root = tileModel.createRootMesh();
			root.scaling = new Vector3(5.5, 3, 5.5);

			tiles.map((tile) => {
				const position = new Vector3(...tile.position);

				return Tile({
					position,
					scene,
					metadata: {
						...tile,
					},
					rootMesh: new Mesh(tile.id, scene, null, root),
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
