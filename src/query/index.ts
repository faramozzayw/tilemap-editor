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

export const MAP_DATE_TO_EDIT = gql`
	query EditMap($mapID: String!) {
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
