import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

import { Tokens, Claims } from "../types";
import { RefreshAccessTokenMutationResult } from "../types/graphql";

import { User } from "./auth";

export const getAccessToken = () => Cookies.get("access_token");
export const getRefreshToken = () => localStorage?.getItem("refresh_token");
export const isAuthenticatedByToken = () => !!getAccessToken();

export const inOneHour = () => {
	const expires = 60 * 60 * 1000;
	const inOneHour = new Date(new Date().getTime() + expires);
	return inOneHour;
};

/**
 * Set access_token and refresh_token
 */
export const setTokens = ({
	access_token,
	expires_in,
	refresh_token,
}: Tokens) => {
	Cookies.set("access_token", access_token, { expires: expires_in });
	if (refresh_token) {
		localStorage?.setItem("refresh_token", refresh_token);
	}
};

export const getUserFromStorage = (): User | null => {
	if (typeof localStorage === "undefined") return null;

	const rawUser = localStorage?.getItem("user");

	return rawUser ? JSON.parse(rawUser) : null;
};

export const setUserToStorage = (user: User) => {
	localStorage.setItem("user", JSON.stringify(user));
};

/**
 * Remove access_token and refresh_token
 */
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
			const { error } = res;

			if (jwt) {
				const { exp } = jwt_decode<Claims>(jwt.accessToken);
				setTokens({
					access_token: jwt.accessToken,
					expires_in: exp,
					refresh_token: jwt.refreshToken,
				});
			} else {
				console.error("Bad refresh response: ", error?.message);
			}
		})
		.catch(console.error);
};
