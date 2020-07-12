import * as THREE from "three";

import { randomColor } from "./index";
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

		const tileColor = randomColor();
		const material = new THREE.MeshLambertMaterial({
			color: tileColor,
		});

		const mesh = new THREE.Mesh(geometry, material);
		this.add(mesh);
		this.position.set(position[0], position[1], position[2]);
		return this;
	}
}
