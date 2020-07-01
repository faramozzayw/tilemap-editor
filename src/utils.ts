import * as THREE from "three";

export const $ = (selector: string): Node[] => {
	let elements = document.querySelectorAll(selector);
	return Array.prototype.slice.call(elements);
};

export const createHex = (color?: number | string) => {
	const radiusTop = 6.5;
	const radiusBottom = 8.0;
	const height = 1.0;
	const radialSegments = 6;
	const heightSegments = 2;
	const openEnded = false;
	const thetaStart = Math.PI * 0.25;
	const thetaLength = Math.PI * 2.0;

	const geometry = new THREE.CylinderBufferGeometry(
		radiusTop,
		radiusBottom,
		height,
		radialSegments,
		heightSegments,
		openEnded,
		thetaStart,
		thetaLength,
	);

	const material = new THREE.MeshBasicMaterial({ color: color ?? 0x4c37a6 });
	const hex = new THREE.Mesh(geometry, material);

	return hex;
};
