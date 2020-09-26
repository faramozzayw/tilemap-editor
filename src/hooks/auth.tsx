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
	 *
	 * @returns void
	 */
	logout: () => void;
	/**
	 * Login
	 *
	 * @param {JWT} jwt
	 * @param {boolean} autoSync - if `true` will trigger `sync` after login. Default set to `true`.
	 */
	login: (jwt: Jwt, autoSync?: boolean) => void;
	/**
	 * Will update the user directly from the argument
	 *
	 * @param {User} user - New user data
	 * @returns void
	 */
	updateUser: (user: User & unknown) => void;

	/**
	 * Synchronizes local user data with actual user data on the server
	 *
	 * @returns void
	 */
	sync: () => void;
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
		onCompleted: ({ me }) => updateUser(me),
		onError: console.error,
	});

	useEffect(() => {
		if (isAuthenticatedByToken()) {
			getMe();
		}
	}, []);

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

	return (
		<AuthContext.Provider
			value={{
				...state,
				login,
				logout,
				updateUser,
				sync: getMe,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export interface AuthHookHelpers {
	isPending: boolean;
	isError: boolean;
	isSuccess: boolean;
	isAuthenticated: boolean;
}

export type AuthHook = AuthContextState & AuthHookHelpers;

export const useAuthState = (): AuthHook => {
	const state = useContext(AuthContext);

	const isPending = state.status === "pending";
	const isError = state.status === "error";
	const isSuccess = state.status === "success";

	const isAuthenticated = (state.user && isSuccess) ?? false;

	return {
		...state,
		isPending,
		isError,
		isSuccess,
		isAuthenticated,
	};
};
