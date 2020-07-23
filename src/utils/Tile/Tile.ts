import {
	Scene,
	Vector3,
	ActionManager,
	ExecuteCodeAction,
	StandardMaterial,
	Tools,
	MeshBuilder,
} from "babylonjs";

import { setCurrentObject } from "../../store/editorStore";

import { TileGeometryConfig, textures, TileMetadata } from "./index";

export const tileRotation = Tools.ToRadians(90);
export const defaultTerrain = "Grassland";

export const Tile = ({
	position,
	scene,
	metadata,
}: {
	position: Vector3;
	scene: Scene;
	metadata: TileMetadata;
}) => {
	const {
		radiusBottom,
		radiusTop,
		height,
		radialSegments,
	} = TileGeometryConfig;
	const mesh = MeshBuilder.CreateCylinder("tile", {
		height,
		diameterTop: radiusTop * 2,
		diameterBottom: radiusBottom * 2,
		tessellation: radialSegments,
		hasRings: true,
	});
	const material = new StandardMaterial("tile material", scene);

	// @ts-ignore
	material.diffuseColor = textures[metadata.baseTerrain];

	mesh.material = material;

	mesh.rotation = new Vector3(0, tileRotation, 0);
	mesh.position = position;

	mesh.metadata = metadata;

	const actionManager = new ActionManager(scene);
	mesh.actionManager = actionManager;
	mesh.actionManager.registerAction(
		new ExecuteCodeAction(ActionManager.OnPickTrigger, (event) => {
			setCurrentObject(event.source);
		}),
	);

	return mesh;
};
