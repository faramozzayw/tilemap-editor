import {
	Scene,
	Engine,
	FreeCamera,
	Vector3,
	HemisphericLight,
	Mesh,
	ArcRotateCamera,
	ActionManager,
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
		-Math.PI / 2,
		Math.PI / 3,
		10,
		new Vector3(0, 2, -10),
		scene,
	);

	camera.setTarget(Vector3.Zero());
	camera.attachControl(canvas, false);

	const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

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
