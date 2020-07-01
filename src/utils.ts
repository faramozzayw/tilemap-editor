import * as THREE from "three";

export const $ = (selector: string): Node[] => {
	let elements = document.querySelectorAll(selector);
	return Array.prototype.slice.call(elements);
};

export const createHex = (color?: number | string) => {
	const radiusTop = 5.0;
	const radiusBottom = 5.5;
	const height = 1.0;
	const radialSegments = 6;
	const geometry = new THREE.CylinderBufferGeometry(
		radiusTop,
		radiusBottom,
		height,
		radialSegments,
	);

	const material = new THREE.MeshPhongMaterial({ color: color ?? 0x4c37a6 });
	const hex = new THREE.Mesh(geometry, material);

	return hex;
};
