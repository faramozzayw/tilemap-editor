import { gql } from "@apollo/client";

export const GET_MAP_DATA = gql`
	query EditMap($mapID: ID!) {
		map(id: $mapID) {
			id
			name
			author
			description
			updatedAt
			createdAt
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

export const GET_MAPS = gql`
	query GEtMaps {
		maps {
			id
			name
			author
			description
			createdAt
			size {
				row
				column
			}
		}
	}
`;
