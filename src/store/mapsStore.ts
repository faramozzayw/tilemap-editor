import { createStore, createEvent } from "effector";

import { MapConfig, MapID } from "./../types";

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

		return {
			...store,
			maps: oldMaps.concat({
				...newMap,
				id: oldMaps[oldMaps.length - 1].id + 1,
			}),
		};
	})
	.reset(reset);

createMap.watch((payload) => console.log("туц туц туц", payload));
