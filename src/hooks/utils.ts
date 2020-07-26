import Cookies from "js-cookie";
import { Tokens } from "../types";

export const getAccessToken = () => Cookies.get("access_token");
export const getRefreshToken = () => Cookies.get("refresh_token");
export const isAuthenticatedByToken = () => !!getAccessToken();

export const setTokensToCookies = ({
	access_token,
	refresh_token,
	expires_in,
}: Tokens) => {
	const expires = (expires_in ?? 60 * 60) * 1000;
	const inOneHour = new Date(new Date().getTime() + expires);

	Cookies.set("access_token", access_token, { expires: inOneHour });
	refresh_token && Cookies.set("refresh_token", refresh_token);
};

export const removeTokens = () => {
	Cookies.remove("access_token");
	Cookies.remove("refresh_token");
};
