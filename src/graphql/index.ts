import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken } from "../hooks/utils";

const authLink = setContext((_, { headers }) => {
	const token = getAccessToken();
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
	link: authLink.concat(httpLink),
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

export { MapInfoFrag, MapTilesFrag } from "./fragments";
