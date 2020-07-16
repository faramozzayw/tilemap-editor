import {
	Scene,
	Vector3,
	Mesh,
	ActionManager,
	ExecuteCodeAction,
	StandardMaterial,
	Color3,
	Tools,
	SpriteManager,
	Texture,
} from "babylonjs";
import { resolve } from "path";

import { TileConfig } from "../types";
import { setCurrentObject } from "../store/editorStore";

import url from "./WWT-07.png";

export interface ITileGeometryConfig {
	readonly radiusTop: number;
	readonly radiusBottom: number;
	readonly height: number;
	readonly radialSegments: number;
}

/// radiusTop <= radiusBottom

export const TileGeometryConfig: ITileGeometryConfig = {
	radiusTop: 5.5,
	radiusBottom: 5.5,
	height: 0.25,
	radialSegments: 6,
};

type TileContructProps = Pick<TileConfig, "position"> &
	Partial<Omit<TileConfig, "position">>;

export const tileRotation = Tools.ToRadians(90);
console.log(tileRotation);

export const Tile = ({
	position,
	scene,
}: {
	position: Vector3;
	scene: Scene;
}) => {
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
		1,
		scene,
		false,
	);
	const material = new StandardMaterial("tile material", scene);

	// material.diffuseColor = new Color3(1, 0, 1);
	const texture = new Texture(url, scene);
	material.diffuseTexture = texture;
	material.specularTexture = texture;
	material.emissiveTexture = texture;
	material.ambientTexture = texture;
	mesh.material = material;

	mesh.rotation = new Vector3(0, tileRotation, 0);
	mesh.position = position;

	const actionManager = new ActionManager(scene);
	mesh.actionManager = actionManager;
	mesh.actionManager.registerAction(
		new ExecuteCodeAction(ActionManager.OnPickTrigger, (event) => {
			setCurrentObject(event.source);
		}),
	);

	return mesh;
};
