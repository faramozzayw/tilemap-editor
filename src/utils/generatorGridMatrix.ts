import { Tile, range } from "./index";

export const generateGridMatrix = (
	rows: number = 0,
	columns: number = 0,
): Tile[] => {
	let tiles = [];

	const dx = 10;
	const dy = 8.5 / 2;

	for (let i of range(0, rows)) {
		const row: any[] = [];

		for (let j of range(0, columns)) {
			const zOffset = j * dy * 2;
			const basicXOffset = i * dx;

			row.push(
				j % 2 === 0
					? new Tile().translateX(basicXOffset).translateZ(zOffset)
					: new Tile().translateX(basicXOffset + dx / 2).translateZ(zOffset),
			);
		}

		tiles.push(...row);
	}

	return tiles;
};
