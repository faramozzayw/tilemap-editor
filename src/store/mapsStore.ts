import { createStore, createEvent } from "effector";

import { MapConfig, MapID } from "./../types";
import { generateGridMatrix } from "./../utils";
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
	.on(createMap, (store, newMap) => {
		const { maps: oldMaps } = store;
		const { row, column } = newMap.size;

		return {
			...store,
			maps: oldMaps.concat({
				...newMap,
				tiles: generateGridMatrix(row, column),
			}),
		};
	})
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

/*
createMap({
	name: "test example",
	author: "Anonim",
	id: "id0",
	description: `The icon element is a container for any type of icon font. Because the icons can take a few seconds to load, and because you want control over the space the icons will take, you can use the icon class as a reliable square container that will prevent the page to "jump" on page load.`,
	createData: new Date(),
	size: {
		row: 5,
		column: 5,
	},
	tiles: [],
});
*/

createMap.watch((payload) => console.log("туц туц туц", payload));
deleteMap.watch((payload) => console.info(`удалена карта с id: ${payload}`));
