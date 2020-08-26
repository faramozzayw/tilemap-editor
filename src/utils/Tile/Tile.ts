import {
	Scene,
	Vector3,
	ActionManager,
	ExecuteCodeAction,
	Tools,
	Color3,
	StandardMaterial,
	Geometry,
	AbstractMesh,
	Mesh,
} from "babylonjs";

import { setCurrentObject } from "../../store/editorStore";
import { TileMetadata, textures } from "./index";

export const tileRotation = Tools.ToRadians(90);
export const defaultTerrain = "Grassland";

export const Tile = ({
	position,
	scene,
	metadata,
	rootMesh,
}: {
	position: Vector3;
	scene: Scene;
	metadata: TileMetadata;
	rootMesh: AbstractMesh;
}) => {
	rootMesh.position = position;

	rootMesh.metadata = metadata;

	const actMesh = rootMesh.getChildMeshes()[1];
	actMesh.metadata = metadata;

	actMesh.metadata.setBaseTerrain = () => {
		material.diffuseColor = textures[metadata.baseTerrain] ?? textures.fallback;
	};

	const material = new StandardMaterial("tile material", scene);
	actMesh.metadata.setBaseTerrain();

	actMesh.material = material;

	actMesh.actionManager = new ActionManager(scene);
	actMesh.actionManager.registerAction(
		new ExecuteCodeAction(ActionManager.OnPickTrigger, (event) => {
			setCurrentObject(event.source);
		}),
	);

	return rootMesh;
};
