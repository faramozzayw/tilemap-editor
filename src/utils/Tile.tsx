import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";

import { loader, randomColor } from "./index";

export interface ITileConfig {
	readonly radiusTop: number;
	readonly radiusBottom: number;
	readonly height: number;
	readonly radialSegments: number;
}

export const TileConfig: ITileConfig = {
	radiusTop: 5.0,
	radiusBottom: 5.5,
	height: 0.25,
	radialSegments: 6,
};

export class Tile extends THREE.Object3D {
	constructor({ position }: any) {
		super();

		const { radiusBottom, radiusTop, height, radialSegments } = TileConfig;

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
