import * as THREE from "three";
import { randomColor } from "./index";

export interface ITileConfig {
	readonly radiusBottom: number;
	readonly radiusTop: number;
}

export const TileConfig: ITileConfig = {
	radiusBottom: 5.5,
	radiusTop: 5.0,
};

export class Tile extends THREE.Object3D {
	constructor() {
		super();
		const { radiusTop, radiusBottom } = TileConfig;

		const height = 1.0;
		const radialSegments = 6;
		const geometry = new THREE.CylinderBufferGeometry(
			radiusTop,
			radiusBottom,
			height,
			radialSegments,
		);
		const tileColor = randomColor();

		let material = new THREE.MeshLambertMaterial({
			color: tileColor,
		});

		material.flatShading = true;
		const mesh = new THREE.Mesh(geometry, material);
		this.add(mesh);

		return this;
	}
}
