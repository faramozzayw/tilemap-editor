import React from "react";
import { Tile, range, randomColor } from "./index";

type TileBox = typeof Tile;

export const generateGridMatrix = (
	rows: number = 0,
	columns: number = 0,
): TileBox[] => {
	let tiles = [];

	const dx = 10;
	const dy = 8.5 / 2;

	for (const i of range(0, rows)) {
		const row: any[] = [];

		for (const j of range(0, columns)) {
			const zOffset = j * dy * 2;
			const basicXOffset = i * dx;

			const key = randomColor();

			row.push(
				j % 2 === 0 ? (
					<Tile key={key} position={[basicXOffset, 0, zOffset]} />
				) : (
					<Tile key={key} position={[basicXOffset + dx / 2, 0, zOffset]} />
				),
			);
		}

		tiles.push(...row);
	}

	return tiles;
};
