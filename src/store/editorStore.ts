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
		try {
			state!.currentObject!.material!.wireframe = false;
		} catch {}

		try {
			newObject!.material!.wireframe = true;
		} catch {}

		return {
			...state,
			currentObject: newObject,
		};
	})
	.reset(reset);
