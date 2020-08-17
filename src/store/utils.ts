import { UpdateTileConfig } from "../types/graphql";

export const updateTile = (mapID: string) => (
	tileID: string,
	updateValue: UpdateTileConfig,
) => {
	const { baseTerrain } = updateValue;

	return fetch("https://api-tilemap-editor.herokuapp.com/graphql", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
            mutation {
                updateTile(
                    mapId: "${mapID}"
                    tileId: "${tileID}"
                    updateValue: {
                        baseTerrain: ${baseTerrain ?? null}
                    }
                )
            }
            `,
		}),
	});
};
