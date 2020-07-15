import {
	Scene,
	Vector3,
	Mesh,
	ActionManager,
	ExecuteCodeAction,
	StandardMaterial,
	Color3,
} from "babylonjs";

import { TileConfig } from "../types";
import { setCurrentObject } from "../store/editorStore";

export interface ITileGeometryConfig {
	readonly radiusTop: number;
	readonly radiusBottom: number;
	readonly height: number;
	readonly radialSegments: number;
}

export const TileGeometryConfig: ITileGeometryConfig = {
	radiusTop: 5.0,
	radiusBottom: 5.5,
	height: 0.25,
	radialSegments: 6,
};

type TileContructProps = Pick<TileConfig, "position"> &
	Partial<Omit<TileConfig, "position">>;

export const Tile = ({ position, scene }: { position: any; scene: Scene }) => {
	const {
		radiusBottom,
		radiusTop,
		height,
		radialSegments,
	} = TileGeometryConfig;
	const mesh = Mesh.CreateCylinder(
		"tile",
		height,
		radiusTop * 2,
		radiusBottom * 2,
		radialSegments,
		3,
		scene,
		false,
	);
	const material = new StandardMaterial("tile material", scene);

	material.diffuseColor = new Color3(1, 0, 1);
	mesh.material = material;

	mesh.rotation = new Vector3(0, 10, 0);
	mesh.position = position;

	const actionManager = new ActionManager(scene);
	mesh.actionManager = actionManager;
	mesh.actionManager.registerAction(
		new ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, (event) => {
			setCurrentObject(event.source);
		}),
	);

	return mesh;
};
