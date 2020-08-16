import { createStore, createEvent } from "effector";

import { InstrumentsEnum, BaseTerrain } from "./../types";
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

	currentBaseTerrain?: BaseTerrain;
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

		console.log(newObject.metadata);

		return {
			...state,
			currentObject: newObject,
			currentBaseTerrain: newObject.metadata.baseTerrain,
		};
	})
	.on(setCurrentTerrain, (state, newBaseTerrain) => {
		if (state.currentObject) {
			state.currentObject.metadata.baseTerrain = newBaseTerrain;

			// @ts-ignore
			state.currentObject!.material!.diffuseColor =
				textures[newBaseTerrain] ?? new Color3(1, 1, 1);

			fetch("https://api-tilemap-editor.herokuapp.com/graphql", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					query: `
                            mutation {
                                updateTile(
                                    mapId: "9250c5c3-8487-4e4c-af7c-38a13738389e"
                                    tileId: "${
																			state.currentObject.metadata!.id
																		}"
                                    updateValue: {
                                        baseTerrain: ${newBaseTerrain}
                                    }
                                )
                            }
                            `,
				}),
			})
				.then((res) => res.json())
				.then((res) => console.log(res));

			return {
				...state,
				currentBaseTerrain: newBaseTerrain,
			};
		}
	})
	.reset(reset);
