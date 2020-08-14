import { TileConfig, BaseTerrainEnum } from "./../../types";
import { Color3 } from "babylonjs";

export { Tile } from "./Tile";

export interface ITileGeometryConfig {
	readonly radiusTop: number;
	readonly radiusBottom: number;
	readonly height: number;
	readonly radialSegments: number;
}

export type TileContructProps = TileConfig;

export type TileMetadata = TileConfig;

export const TileGeometryConfig: ITileGeometryConfig = {
	radiusTop: 5.5,
	radiusBottom: 5.5,
	height: 0.25,
	radialSegments: 6,
};

export type Textures = {
	[key in BaseTerrainEnum]: Color3;
};

export const textures: Textures = {
	Coast: new Color3(0.1, 0.1, 0.1),
	Desert: new Color3(1, 1, 0),
	Grassland: new Color3(0, 0.9, 0.1),
	Forest: new Color3(0.25, 0.7, 0),
	Jungle: new Color3(0.1, 0.95, 0.1),
	Ocean: new Color3(0.25, 0.1, 0.85),
	Snow: new Color3(1, 1, 1),
};
