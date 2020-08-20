import { gql } from "@apollo/client";

import { MapInfoFrag, MapTilesFrag } from "./fragments";

export const GET_MAP_DATA = gql`
	query EditMap($mapID: ID!) {
		map(id: $mapID) {
			...MapInfo
			...MapTiles
		}
	}
	${MapInfoFrag}
	${MapTilesFrag}
`;

export const GET_MAPS = gql`
	query GEtMaps {
		maps {
			...MapInfo
		}
	}
	${MapInfoFrag}
`;

console.log(MapInfoFrag);

export const GET_MAPS_BY_USER = gql`
	query GetMapsByUser($username: String!) {
		maps(filter: { author: $username }) {
			...MapInfo
		}
	}
	${MapInfoFrag}
`;
