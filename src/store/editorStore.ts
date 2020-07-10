import { createStore, createEvent } from "effector";

export type Instrument =
	| "Terrain"
	| "Resource"
	| "Building"
	| "Units"
	| "Continents"
	| "Owner";

export const changeInstrument = createEvent<Instrument>();

export const reset = createEvent();

export interface IEditorStore {
	currentInstrument: Instrument;
}

export const initState = {
	currentInstrument: "Terrain" as Instrument,
};

export const editorStore = createStore<IEditorStore>(initState)
	.on(changeInstrument, (state, newInstrument) => {
		return {
			...state,
			currentInstrument: newInstrument,
		};
	})
	.reset(reset);
