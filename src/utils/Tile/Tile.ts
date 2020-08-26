import {
	Scene,
	Vector3,
	ActionManager,
	ExecuteCodeAction,
	StandardMaterial,
	AbstractMesh,
} from "babylonjs";

import { setCurrentObject } from "../../store/editorStore";
import { TileMetadata, textures } from "./index";
import { BaseTerrain } from "../../types";

export interface TileProps {
	position: Vector3;
	scene: Scene;
	metadata: TileMetadata;
	rootMesh: AbstractMesh;
}

export class Tile extends AbstractMesh {
	rootMesh: AbstractMesh;
	actMesh: AbstractMesh;

	/**
	 * Set new base terrain
	 * @returns {BaseTerrain} Prev base terrain
	 */
	setBaseTerrain: (newBaseTerrain: BaseTerrain) => BaseTerrain;
	setActive: (status?: boolean) => void;
	getMetadata = (): TileMetadata => this.actMesh.metadata;

	constructor({ rootMesh, metadata, scene, position }: TileProps) {
		super("Tile", scene);

		this.rootMesh = rootMesh;

		rootMesh.position = position;
		rootMesh.metadata = metadata;

		const actMesh = rootMesh.getChildMeshes()[1];
		const material = new StandardMaterial("tile material", scene);

		this.actMesh = actMesh;
		this.actMesh.metadata = metadata;
		this.actMesh.material = material;

		this.setBaseTerrain = (newBaseTerrain) => {
			let prev = this.actMesh.metadata.baseTerrain;

			this.actMesh.metadata.baseTerrain = newBaseTerrain;
			material.diffuseColor = textures[newBaseTerrain] ?? textures.fallback;

			return prev;
		};

		this.setActive = (status = true) => {
			material.alpha = status ? 0.9 : 1;
		};

		this.setBaseTerrain(metadata.baseTerrain);

		actMesh.actionManager = new ActionManager(scene);
		actMesh.actionManager.registerAction(
			new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
				setCurrentObject(this);
			}),
		);
	}
}

/**
 * @deprecated
 */
export const DTile = ({
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
