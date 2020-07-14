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

/*
export class Tile extends THREE.Object3D {
	constructor({ position }: TileContructProps) {
		super();

		const {
			radiusBottom,
			radiusTop,
			height,
			radialSegments,
		} = TileGeometryConfig;

		const geometry = new THREE.CylinderBufferGeometry(
			radiusTop,
			radiusBottom,
			height,
			radialSegments,
		);

		const tileColor = "#9E1086";
		const material = new THREE.MeshLambertMaterial({
			color: tileColor,
		});

		const mesh = new THREE.Mesh(geometry, material);
		this.add(mesh);
		this.position.set(position[0], position[1], position[2]);
		return this;
	}
}
*/
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
	material.specularColor = new Color3(0.5, 0.6, 0.87);
	material.emissiveColor = new Color3(1, 1, 1);
	material.ambientColor = new Color3(0.23, 0.98, 0.53);
	//material.wireframe = true;

	mesh.material = material;

	mesh.rotation = new Vector3(0, 10, 0);
	mesh.position = position;

	const actionManager = new ActionManager(scene);
	mesh.actionManager = actionManager;
	mesh.actionManager.registerAction(
		new ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, (event) => {
			const wireframe = event.source.material.wireframe;
			event.source.material.wireframe = !wireframe;
			console.log(event.source.material);
		}),
	);

	return mesh;
};
