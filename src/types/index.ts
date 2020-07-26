export enum BaseTerrainEnum {
	Coast = "Coast",
	Desert = "Desert",
	Grassland = "Grassland",
	//	Hill = "Hill",
	//	Mountain = "Mountain",
	Ocean = "Ocean",
	//	Plains = "Plains",
	Snow = "Snow",
	//	Tundra = "Tundra",
	Forest = "Forest",
	Jungle = "Jungle",
	//	Marsh = "Marsh",
	//	Atoll = "Atoll",
	//	FloodPlains = "FloodPlains",
	// Ice = "Ice",
	//	Lakes = "Lakes",
	//	Oasis = "Oasis",
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
	id: number;
	baseTerrain: BaseTerrain;
	terrainFeatures: TerrainFeatures;
	resource: Resource[];
	units: Unit[];
	position: TilePosition;
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
	description?: string;
	last_edit?: Date;
	create_data: Date;
	size: MapSize;
	tiles: TileConfig[];
}

export interface User {
	username: string;
	email: string;
	[key: string]: any;
}

export interface Tokens {
	access_token: string;
	refresh_token?: string;
	expires_in: number;
}
