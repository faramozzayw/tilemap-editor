export enum BaseTerrainEnum {
	Coast = "Coast",
	Desert = "Desert",
	Grassland = "Grassland",
	Ocean = "Ocean",
	Snow = "Snow",
	Forest = "Forest",
	Jungle = "Jungle",
}

export enum InstrumentsEnum {
	Terrain = "Terrain",
	Resource = "Resource",
	Building = "Building",
	Units = "Units",
	Continents = "Continents",
	Owner = "Owner",
}

export type BaseTerrain = keyof typeof BaseTerrainEnum;
export type TerrainFeatures = any;
export type Resource = any;
export type Unit = any;
export type TilePosition = number[];

export interface TileConfig {
	id: string;
	baseTerrain: BaseTerrain;
	terrainFeatures: TerrainFeatures;
	resource: Resource[];
	units: Unit[];
}

export type MapID = string;
export interface MapSize {
	row: number;
	column: number;
}

export interface MapConfig {
	id: MapID;
	name: string;
	author: string;
	description?: string | null;
	updatedAt?: Date;
	createdAt: Date;
	size: MapSize;
	tiles?: TileConfig[];
}

export interface User {
	username: string;
	id?: string;
	email?: string;
	image?: string;
	description?: string | null;
	[key: string]: any;
}

export interface Tokens {
	access_token: string;
	refresh_token?: string;
	expires_in: number;
}
