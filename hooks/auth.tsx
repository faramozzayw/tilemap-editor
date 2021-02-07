import React, { createContext, useState, useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";

import { Tokens, PartialBy, Claims } from "./../types";
import {
	setTokens,
	isAuthenticatedByToken,
	removeTokens,
	setUserToStorage,
	getUserFromStorage,
} from "./utils";
import { client } from "../graphql";
import { Jwt, User as BasicUser, useMeLazyQuery } from "../types/graphql";

export type AuthStatus = "pending" | "error" | "success";

export type User = PartialBy<BasicUser, "email">;

export interface AuthContextState {
	/** Indicate the current authorization status  */
	status: AuthStatus;
	error: Error | null;
	/** User */
	user: User | null;
	/**
	 * Call to log out user
	 */
	logout: () => void;
	/**
	 * Login
	 *
	 * @param {boolean} autoSync - if `true` will trigger `sync` after login. Default set to `true`.
	 */
	login: (jwt: Jwt, autoSync?: boolean) => void;
	/**
	 * Will update the user directly from the argument
	 *
	 * @param user - New user data
	 */
	updateUser: (user: User & unknown) => void;

	/**
	 * Synchronizes local user data with actual user data on the server
	 */
	sync: () => void;

	isPending: boolean;
	isError: boolean;
	isSuccess: boolean;
	isAuthenticated: boolean;
}

export const initialState: AuthContextState = {
	status: "pending",
	error: null,
	user: null,
	// it's ugly :(
	login: () => {},
	logout: () => {},
	updateUser: () => {},
	sync: () => {},
	isPending: false,
	isError: false,
	isSuccess: false,
	isAuthenticated: false,
};

export const AuthContext = createContext<AuthContextState>(initialState);

const initState = () => {
	const isAuth = isAuthenticatedByToken();
	const status: AuthStatus = isAuth ? "success" : "error";
	const user = getUserFromStorage();

	return {
		...initialState,
		status,
		user: isAuth ? user : null,
	};
};

export const AuthProvider: React.FC = ({ children }) => {
	const [state, setState] = useState<AuthContextState>(() => initState());
	const [getMe] = useMeLazyQuery({
		onCompleted: ({ me }) => {
			updateUser(me);
			setState((prev) => ({
				...prev,
				status: "success",
			}));
		},
		onError: console.error,
	});

	useEffect(() => {
		if (isAuthenticatedByToken()) {
			getMe();
		} else {
			setTimeout(getMe, 1500);
		}
	}, [getMe]);

	const logout = () => {
		setState({
			...state,
			user: null,
			status: "pending",
		});

		client.resetStore();
		localStorage.removeItem("user");
		removeTokens();
	};

	const login = (jwt: Jwt, autoSync: boolean = true) => {
		const user: Claims = jwt_decode(jwt.accessToken);
		const tokens: Tokens = {
			access_token: jwt.accessToken,
			refresh_token: jwt.refreshToken,
			expires_in: user.exp,
		};

		setState({
			...state,
			user,
			status: "success",
		});

		setUserToStorage(user);
		setTokens(tokens);

		if (autoSync) {
			getMe();
		}
	};

	const updateUser = (user: User & unknown) => {
		setState((prevState) => {
			const newUser = {
				...state.user,
				...user,
			};
			setUserToStorage(newUser);

			return {
				...prevState,
				user: newUser,
			};
		});
	};

	const isPending = state.status === "pending";
	const isError = state.status === "error";
	const isSuccess = state.status === "success";

	const isAuthenticated = (state.user && isSuccess) ?? false;

	return (
		<AuthContext.Provider
			value={{
				...state,
				login,
				logout,
				updateUser,
				sync: getMe,
				isPending,
				isError,
				isSuccess,
				isAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthState = (): AuthContextState => useContext(AuthContext);
