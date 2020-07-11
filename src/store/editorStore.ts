import { createStore, createEvent } from "effector";

import { InstrumentsEnum } from "./../types";

export type Instrument = keyof typeof InstrumentsEnum;

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
