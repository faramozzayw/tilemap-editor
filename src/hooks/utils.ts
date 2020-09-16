import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

import { Tokens, Claims } from "../types";
import { RefreshAccessTokenMutationResult } from "../types/graphql";

export const getAccessToken = () => Cookies.get("access_token");
export const getRefreshToken = () => localStorage.getItem("refresh_token");
export const isAuthenticatedByToken = () => !!getAccessToken();

export const inOneHour = () => {
	const expires = 60 * 60 * 1000;
	const inOneHour = new Date(new Date().getTime() + expires);
	return inOneHour;
};

export const setTokens = ({
	access_token,
	expires_in,
	refresh_token,
}: Tokens) => {
	Cookies.set("access_token", access_token, { expires: expires_in });
	if (refresh_token) {
		localStorage.setItem("refresh_token", refresh_token);
	}
};

export const removeTokens = () => {
	Cookies.remove("access_token");
	localStorage.removeItem("refresh_token");
};

export const refreshToken = async () => {
	const refreshToken = getRefreshToken();

	if (!refreshToken) {
		console.error("Refresh token not found.");
		return;
	}

	const query = {
		query: `
            mutation {
                refreshAccessToken(refreshToken: "${refreshToken}") {
                	accessToken
                    refreshToken
                }
            }
        `,
	};

	return await fetch("https://api-tilemap-editor.herokuapp.com/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(query),
	})
		.then((res) => res.json())
		.then((res: RefreshAccessTokenMutationResult) => {
			const jwt = res.data?.refreshAccessToken;

			if (jwt) {
				const { exp } = jwt_decode<Claims>(jwt.accessToken);
				setTokens({
					access_token: jwt.accessToken,
					expires_in: exp,
					refresh_token: jwt.refreshToken,
				});
			} else {
				console.error("Bad refresh response");
			}
		})
		.catch(console.error);
};
