import { TileConfig } from "./../../types";
import { Color3 } from "babylonjs";

export { Tile } from "./Tile";

export interface ITileGeometryConfig {
	readonly radiusTop: number;
	readonly radiusBottom: number;
	readonly height: number;
	readonly radialSegments: number;
}

export type TileContructProps = Pick<TileConfig, "position"> &
	Partial<Omit<TileConfig, "position">>;

export const TileGeometryConfig: ITileGeometryConfig = {
	radiusTop: 5.5,
	radiusBottom: 5.5,
	height: 0.25,
	radialSegments: 6,
};

export const textures = {
	Coast: new Color3(1, 0, 1),
	Desert: new Color3(0.4, 0.1, 1),
	Grassland: new Color3(0.25, 0.12, 0.14),
};
