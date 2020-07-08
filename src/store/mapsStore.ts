import { createStore, createEvent } from "effector";

import { MapConfig, MapID } from "./../types";
import { generateGridMatrix } from "./../utils";

export interface IMapStore {
	maps: MapConfig[];
}

export const createMap = createEvent<Omit<MapConfig, "id">>("Create new map");
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
				id: (oldMaps[oldMaps.length - 1]?.id ?? 0) + 1,
				tiles: generateGridMatrix(row, column),
			}),
		};
	})
	.reset(reset);

createMap.watch((payload) => console.log("туц туц туц", payload));
