export type BaseTerrain = any;
export type TerrainFeatures = any;
export type Resource = any;

export interface TileConfig {
	id: number;
	baseTerrain: BaseTerrain;
	terrainFeatures: TerrainFeatures;
	resource: Resource[];
	units: any[];
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
