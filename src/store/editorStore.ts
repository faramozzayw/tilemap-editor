import { createStore, createEvent } from "effector";
import { ApolloQueryResult } from "@apollo/client";

import { InstrumentsEnum, BaseTerrain } from "./../types";

import { UpdateTileConfig } from "./../types/graphql";
import { updateTile } from "./utils";
import { addNotification } from "./notificationStore";
import { Tile } from "../utils/Tile";

export type Instrument = keyof typeof InstrumentsEnum;

export const changeInstrument = createEvent<Instrument>();
export const setCurrentObject = createEvent<Tile>();
export const setCurrentTerrain = createEvent<BaseTerrain>();
export const setCurrentMapID = createEvent<string>();
export const reset = createEvent();

export interface IEditorStore {
	currentInstrument: Instrument;
	currentObject: Tile | null;

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
		state.currentObject?.setActive(false);
		newObject.setActive();

		return {
			...state,
			currentObject: newObject,
			currentBaseTerrain: newObject.getMetadata().baseTerrain,
		};
	})
	.on(setCurrentTerrain, (state, newBaseTerrain) => {
		if (state.currentObject && state.updateTile) {
			const { id: tileID } = state.currentObject.getMetadata();
			const prevBaseTerrain: BaseTerrain = state.currentObject.setBaseTerrain(
				newBaseTerrain,
			);

			state
				.updateTile(tileID, {
					baseTerrain: newBaseTerrain as any,
				})
				.then((res) => res.json())
				.then((res: ApolloQueryResult<string>) => {
					if (res.errors) {
						addNotification({
							type: "danger",
							message: "Failed to update tile ;(",
						});

						state.currentObject?.setBaseTerrain(prevBaseTerrain);
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
