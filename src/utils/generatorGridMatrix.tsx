import { range } from "./index";
import { TileConfig, Resource, Unit } from "./../types";

export interface TileEntity {
	position: number[];
}

type RawTile = Omit<Omit<TileConfig, "id">, "position">;

export const baseTile: RawTile = {
	baseTerrain: "Coast",
	terrainFeatures: "none",
	resource: [] as Resource,
	units: [] as Unit,
};

export const generateGridMatrix = (
	rows: number = 0,
	columns: number = 0,
): TileConfig[] => {
	let id = 0;
	let tiles: TileConfig[] = [];

	const dx = 10;
	const dy = 8.5 / 2;

	for (const i of range(0, rows)) {
		const row: TileConfig[] = [];

		for (const j of range(0, columns)) {
			const zOffset = j * dy * 2;
			const basicXOffset = i * dx;

			const position =
				j % 2 === 0
					? [basicXOffset, 0, zOffset]
					: [basicXOffset + dx / 2, 0, zOffset];

			row.push({
				...baseTile,
				position,
				id: id++,
			});
		}

		tiles.push(...row);
	}

	return tiles;
};
