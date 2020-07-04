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
