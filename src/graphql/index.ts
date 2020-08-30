import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
	uri: "https://api-tilemap-editor.herokuapp.com/graphql",
	credentials: "same-origin",
	fetchOptions: {
		mode: "cors",
	},
	headers: {
		"Access-Control-Allow-Credentials": true,
	},
});

export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

export { DELETE_MAP_BY_ID, CREATE_MAP, LOGIN, SIGN_UP } from "./mutation";

export {
	GET_MAP_DATA,
	GET_MAPS,
	GET_MAPS_BY_USER,
	GET_MAPS_PAGINATION,
} from "./query";

export { MapInfoFrag, MapTilesFrag } from "./fragments";
