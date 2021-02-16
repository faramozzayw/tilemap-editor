import { useMemo } from "react";
import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";
import jwt_decode from "jwt-decode";

import { getAccessToken, refreshToken, getRefreshToken } from "../hooks/utils";
import { Claims } from "../types";

const authLink = setContext(async (_, { headers }) => {
	if (typeof window === "undefined") {
		return {};
	}

	let token = getAccessToken();

	if (token) {
		const { exp } = jwt_decode<Claims>(token);
		const currentTime = Math.floor(Date.now() / 1000);

		if (currentTime >= exp) {
			await refreshToken();
			token = getAccessToken();
		}
	} else if (getRefreshToken()) {
		await refreshToken();
		token = getAccessToken();
	}

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

let apolloClient: ApolloClient<any> | null = null;

export const createApolloClient = ({ initialState }: any) =>
	new ApolloClient({
		link: ApolloLink.from([authLink, httpLink]),
		ssrMode: typeof window === "undefined",
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						mapsPagination: relayStylePagination(),
					},
				},
			},
		}).restore(initialState || {}),
	});

export const initializeApollo = (initialState = null) => {
	const _apolloClient = apolloClient ?? createApolloClient({ initialState });

	if (initialState) {
		const existingCache = _apolloClient.extract();
		_apolloClient.cache.restore({ ...existingCache, ...initialState });
	}

	if (typeof window === "undefined") return _apolloClient;
	if (!apolloClient) apolloClient = _apolloClient;

	return _apolloClient;
};
