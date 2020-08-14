import { gql } from "@apollo/client";

export const GET_MAP_DATA = gql`
	query EditMap($mapID: ID!) {
		map(id: $mapID) {
			id
			name
			author
			description
			lastEdit
			createData
			size {
				row
				column
			}
			tiles {
				id
				baseTerrain
				terrainFeatures
				resource
				units
			}
		}
	}
`;
