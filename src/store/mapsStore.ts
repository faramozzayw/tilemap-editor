import { createStore, createEvent, createEffect } from "effector";

import { MapConfig, MapID } from "./../types";
import { TileMetadata } from "../utils/Tile";

export interface IMapStore {
	currentMapID: MapID | null;
	maps: MapConfig[];
}

export const createMap = createEvent<MapConfig>("Create new map");
export const deleteMap = createEvent<MapID>("Delete map");
export const saveMap = createEvent<TileMetadata>("Save map");

export const changeCurrentMapID = createEvent<MapID>();

export const reset = createEvent();

export const initState: IMapStore = {
	currentMapID: "id0",
	maps: [],
};

export const mapStore = createStore<IMapStore>(initState)
	.on(deleteMap, (store, mapID) => {
		const { maps: oldMaps } = store;

		return {
			...store,
			maps: oldMaps.filter(({ id }) => id !== mapID),
		};
	})
	.on(saveMap, (store, metadata) => {
		const { maps, currentMapID } = store;

		const mapsClone = [...maps];

		for (let map of mapsClone) {
			if (map.id === currentMapID) {
				const tileIndex = map.tiles.findIndex(
					(tile) => metadata.id === tile.id,
				);

				map.tiles[tileIndex] = {
					...map.tiles[tileIndex],
					...metadata,
				};

				map.lastEdit = new Date();

				break;
			}
		}

		return {
			...store,
			maps: mapsClone,
		};
	})

	.on(changeCurrentMapID, (store, mapID) => ({
		...store,
		currentMapID: mapID,
	}))
	.reset(reset);

createMap.watch((payload) => console.log("туц туц туц", payload));
deleteMap.watch((payload) => console.info(`удалена карта с id: ${payload}`));
