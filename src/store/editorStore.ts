import { createStore, createEvent } from "effector";

import { InstrumentsEnum } from "./../types";
import { Mesh } from "babylonjs";

export type Instrument = keyof typeof InstrumentsEnum;

export const changeInstrument = createEvent<Instrument>();
export const setCurrentObject = createEvent<Mesh>();
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
			state.currentObject!.material!.wireframe = false;
		}

		newObject!.material!.wireframe = true;

		return {
			...state,
			currentObject: newObject,
		};
	})
	.reset(reset);
