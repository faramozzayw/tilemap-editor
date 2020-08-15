import { range } from "./index";
import { TileConfig } from "./../types";

export interface TileEntity {
	position: number[];
}

export interface Position {
	position: number[];
}

export type Tile = TileConfig & Position;

export const generateGridMatrix = (
	tiles: TileConfig[],
	rows: number = 0,
	columns: number = 0,
): Tile[] => {
	let result: Tile[] = [];
	console.log(tiles.length);

	const dx = 10;
	const dy = 8.5 / 2;

	let tileNumber = 0;

	for (const i of range(0, rows)) {
		const row: Tile[] = [];

		for (const j of range(0, columns)) {
			const zOffset = j * dy * 2;
			const basicXOffset = i * dx;

			const position =
				j % 2 === 0
					? [basicXOffset, 0, zOffset]
					: [basicXOffset + dx / 2, 0, zOffset];

			row.push({
				...tiles[tileNumber],
				position,
			});

			tileNumber++;
		}

		result.push(...row);
	}

	return result;
};
