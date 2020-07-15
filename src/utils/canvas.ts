import {
	Scene,
	Engine,
	Vector3,
	HemisphericLight,
	ArcRotateCamera,
	Mesh,
	StandardMaterial,
	Color3,
	Camera,
} from "babylonjs";
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
	/*
    camera.mode = Camera.ORTHOGRAPHIC_CAMERA;

    var distance = 500;
    // @ts-ignore
    var aspect = scene.getEngine().getRenderingCanvasClientRect().height / scene.getEngine().getRenderingCanvasClientRect().width; 
    camera.orthoLeft = -distance / 6;
    camera.orthoRight = distance / 6;
    camera.orthoBottom = camera.orthoLeft * aspect;
    camera.orthoTop = camera.orthoRight * aspect;
    */

	camera.upperBetaLimit = 2;
	camera.wheelPrecision = 5;
	camera.panningSensibility = 5;
	camera.panningInertia = 0.5;
	camera.setTarget(new Vector3(0, 0, 30));
	camera.attachControl(canvas, false);

	const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
	const ground = Mesh.CreateGround("ground1", 100, 100, 2, scene);
	ground.position = new Vector3(15, -0.25, 15);

	const material = new StandardMaterial("tile material", scene);
	material.diffuseColor = new Color3(0.4, 0.25, 1);
	ground.material = material;

	const mapTiles = tiles.map((tile) => {
		const position = new Vector3(...tile.position);

		return Tile({
			position,
			scene,
		});
	});

	return {
		canvas,
		scene,
		camera,
		light,
		engine,
	};
};
