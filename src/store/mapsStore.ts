import { createStore, createEvent } from "effector";

import { MapConfig, MapID } from "./../types";
import { generateGridMatrix } from "./../utils";

export interface IMapStore {
	maps: MapConfig[];
}

export const createMap = createEvent<MapConfig>("Create new map");
export const deleteMap = createEvent<MapID>();
export const reset = createEvent();

export const initState: IMapStore = {
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
	.reset(reset);

createMap({
	name: "test example",
	author: "Anonim",
	id: "id0",
	description: "",
	create_data: new Date(),
	size: {
		row: 5,
		column: 5,
	},
	tiles: null,
});

createMap.watch((payload) => console.log("туц туц туц", payload));
deleteMap.watch((payload) => console.info(`удалена карта с id: ${payload}`));
