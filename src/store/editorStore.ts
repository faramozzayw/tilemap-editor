import { createStore, createEvent } from "effector";

import { InstrumentsEnum, BaseTerrain, BaseTerrainEnum } from "./../types";
import { Mesh, Color3 } from "babylonjs";
import { textures } from "../utils/Tile";

export type Instrument = keyof typeof InstrumentsEnum;

export const changeInstrument = createEvent<Instrument>();
export const setCurrentObject = createEvent<Mesh>();
export const setCurrentTerrain = createEvent<BaseTerrain>();
export const reset = createEvent();

export interface IEditorStore {
	currentInstrument: Instrument;
	currentObject: Mesh | null;
}

export const initState = {
	currentInstrument: "Terrain" as Instrument,
	currentObject: null,
};

export const editorStore = createStore<IEditorStore>(initState)
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
		};
	})
	.on(setCurrentTerrain, (state, newBaseTerrain) => {
		if (state.currentObject) {
			// @ts-ignore
			state.currentObject!.material!.diffuseColor =
				textures[newBaseTerrain] ?? new Color3(1, 1, 1);
		}
	})
	.reset(reset);
