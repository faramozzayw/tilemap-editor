import { gql } from "@apollo/client";

import { MapInfoFrag, MapTilesFrag, UserInfo } from "./fragments";

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

export const GET_MAPS_PAGINATION = gql`
	query GetMapsPagination($limit: Int, $offset: Int) {
		maps(limit: $limit, skip: $offset, sort: { createdAt: ASC }) {
			...MapInfo
		}
	}
	${MapInfoFrag}
`;

export const GET_MAPS = gql`
	query GetMaps {
		maps {
			...MapInfo
		}
	}
	${MapInfoFrag}
`;

export const GET_MAPS_BY_USER = gql`
	query GetMapsByUser($username: String!, $limit: Int, $offset: Int) {
		maps(filter: { author: $username }, limit: $limit, skip: $offset) {
			...MapInfo
		}
	}
	${MapInfoFrag}
`;

export const GET_ME = gql`
	query Me {
		me {
			...UserInfo
		}
	}
	${UserInfo}
`;

export const GET_USER_BY_ID = gql`
	query GetUserByID($id: Uuid!) {
		getUserById(id: $id) {
			...UserInfo
		}
	}
	${MapInfoFrag}
`;

export const GET_USER_BY_USERNAME = gql`
	query GetUserByUsername($username: String!) {
		getUserByUsername(username: $username) {
			...UserInfo
		}
	}
	${MapInfoFrag}
`;
