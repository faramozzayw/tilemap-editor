import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import jwt_decode from "jwt-decode";

import { getAccessToken, refreshToken, getRefreshToken } from "../hooks/utils";
import { Claims } from "../types";

const authLink = setContext(async (_, { headers }) => {
	let token = getAccessToken();

	console.log(`before: ${token}`);

	if (token) {
		const { exp } = jwt_decode<Claims>(token);
		const currentTime = Math.floor(Date.now() / 1000);

		if (currentTime >= exp) {
			await refreshToken();
			token = getAccessToken();
		}
	} else if (getRefreshToken()) {
		console.log("getRefreshToken()");
		await refreshToken();
		token = getAccessToken();
	}

	console.log(`after: ${token}`);

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const httpLink = createHttpLink({
	uri: "https://api-tilemap-editor.herokuapp.com/graphql",
	credentials: "include",
	fetchOptions: {
		mode: "cors",
	},
	headers: {
		"Access-Control-Allow-Credentials": true,
	},
});

export const client = new ApolloClient({
	link: ApolloLink.from([authLink, httpLink]),
	cache: new InMemoryCache(),
});

export { DELETE_MAP_BY_ID, CREATE_MAP, LOGIN, SIGN_UP } from "./mutation";

export {
	GET_MAP_DATA,
	GET_MAPS,
	GET_MAPS_BY_USER,
	GET_MAPS_PAGINATION,
	GET_ME,
} from "./query";

export { MapInfoFrag, MapTilesFrag, UserInfo } from "./fragments";
