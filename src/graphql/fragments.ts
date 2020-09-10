import { gql } from "@apollo/client";

export const MapInfoFrag = gql`
	fragment MapInfo on Map {
		id
		name
		author {
			id
			username
		}
		description
		createdAt
		updatedAt
		size {
			row
			column
		}
	}
`;

export const MapTilesFrag = gql`
	fragment MapTiles on Map {
		tiles {
			id
			baseTerrain
			terrainFeatures
			resource
			units
		}
	}
`;

export const UserInfo = gql`
	fragment UserInfo on User {
		id
		username
		email
		description
	}
`;
