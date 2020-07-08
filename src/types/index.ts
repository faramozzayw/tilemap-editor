import { type } from "os";

export type BaseTerrain = any;
export type TerrainFeatures = any;
export type Resource = any;
export type Unit = any;
export type TilePosition = number[];

export interface TileConfig {
	id: number;
	baseTerrain: BaseTerrain;
	terrainFeatures: TerrainFeatures;
	resource: Resource[];
	units: Unit[];
	position: TilePosition;
}

export type MapID = number;
export interface MapSize {
	row: number;
	column: number;
}

export interface MapConfig {
	id: MapID;
	name: string;
	author: string;
	description?: string;
	last_edit?: Date;
	create_data: Date;
	size: MapSize;
	tiles: TileConfig[] | null;
}
