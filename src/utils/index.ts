export { $ } from "./domUtils";
export { Tile, TileGeometryConfig } from "./Tile";
export { generateGridMatrix } from "./generatorGridMatrix";
export { CanvasBuild } from "./canvas";

export const isDevEnv = () => process.env.NODE_ENV === "development";

export const randomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";

	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}

	return color;
};

export function* range(from = 0, to = 0, inclusive = false) {
	const maxValue = inclusive ? to + 1 : to;

	for (let i = from; i < maxValue; i++) {
		yield i;
	}
}
