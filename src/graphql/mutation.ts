import { gql } from "@apollo/client";

export const CREATE_MAP = gql`
	mutation CreateMap($newMap: NewMap!) {
		createMap(newMap: $newMap) {
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

export const DELETE_MAP_BY_ID = gql`
	mutation DeleteMap($mapID: ID!) {
		deleteMap(id: $mapID) {
			id
		}
	}
`;
