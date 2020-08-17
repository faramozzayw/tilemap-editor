import { createStore, createEvent } from "effector";

import { InstrumentsEnum, BaseTerrain } from "./../types";
import { Mesh } from "babylonjs";
import { textures } from "../utils/Tile";

import { UpdateTileConfig } from "./../types/graphql";
import { updateTile } from "./utils";
import { addNotification } from "./notificationStore";

export type Instrument = keyof typeof InstrumentsEnum;

export const changeInstrument = createEvent<Instrument>();
export const setCurrentObject = createEvent<Mesh>();
export const setCurrentTerrain = createEvent<BaseTerrain>();
export const setCurrentMapID = createEvent<string>();
export const reset = createEvent();

export interface IEditorStore {
	currentInstrument: Instrument;
	currentObject: Mesh | null;

	currentBaseTerrain?: BaseTerrain;

	updateTile?: (
		tileID: string,
		updateValue: UpdateTileConfig,
	) => Promise<Response>;
}

export const initState = {
	currentInstrument: "Terrain" as Instrument,
	currentObject: null,
};

export const editorStore = createStore<IEditorStore>(initState)
	.on(setCurrentMapID, (state, mapID) => ({
		...state,
		updateTile: updateTile(mapID),
	}))
	.on(changeInstrument, (state, newInstrument) => {
		return {
			...state,
			currentInstrument: newInstrument,
		};
	})
	.on(setCurrentObject, (state, newObject) => {
		if (state.currentObject) {
			state.currentObject!.material!.alpha = 1;
		}

		newObject!.material!.alpha = 0.9;

		return {
			...state,
			currentObject: newObject,
			currentBaseTerrain: newObject.metadata.baseTerrain,
		};
	})
	.on(setCurrentTerrain, (state, newBaseTerrain) => {
		if (state.currentObject && state.updateTile) {
			const { id: tileID } = state.currentObject.metadata;
			const prevBaseTerrain: BaseTerrain =
				state.currentObject.metadata.baseTerrain;

			state.currentObject.metadata.baseTerrain = newBaseTerrain;
			// @ts-ignore
			state.currentObject.material!.diffuseColor =
				textures[newBaseTerrain] ?? textures.fallback;

			state
				.updateTile(tileID, {
					baseTerrain: newBaseTerrain as any,
				})
				.then((res) => res.json())
				.then((res) => {
					if (res.errors) {
						addNotification({
							type: "danger",
							message: "Failed to update tile ;(",
						});

						state.currentObject!.metadata.baseTerrain = prevBaseTerrain;
						// @ts-ignore
						state.currentObject.material!.diffuseColor =
							textures[prevBaseTerrain] ?? textures.fallback;
					}
				})
				.catch(console.error);

			return {
				...state,
				currentBaseTerrain: newBaseTerrain,
			};
		}
	})
	.reset(reset);
