import React, { createContext, useState, useContext, useEffect } from "react";

import { User, Tokens } from "./../types";
import {
	setTokens,
	isAuthenticatedByToken,
	removeTokens,
	getRefreshToken,
	refreshToken,
} from "./utils";
import { client } from "../graphql";

export interface AuthProviderProps {
	children: React.ReactChild;
}

export type AuthStatus = "pending" | "error" | "success";

export interface AuthContextState {
	status: AuthStatus;
	error: Error | null;
	user: User | null;
	logout?: () => any;
	signup?: () => any;
	login?: (user: User, tokens: Tokens) => void;
	updateUser?: (user: User & unknown) => void;
}

export const initialState: AuthContextState = {
	status: "pending",
	error: null,
	user: null,
};

export const AuthContext = createContext<AuthContextState>(initialState);

const initState = () => {
	const isAuth = isAuthenticatedByToken();

	const status: AuthStatus = isAuth ? "success" : "error";
	const rawUser = localStorage?.getItem("user");

	let user: User | null = null;

	if (isAuth && rawUser) {
		user = JSON.parse(rawUser);
	}

	return {
		...initialState,
		status,
		user,
	};
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [state, setState] = useState<AuthContextState>({ ...initialState });

	useEffect(() => {
		if (getRefreshToken()) {
			refreshToken().then(() => {
				setState({
					...initState(),
				});
			});
			return;
		}

		setState({
			...initState(),
		});
	}, [setState]);

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

	const login = (user: User, tokens: Tokens) => {
		setState({
			...state,
			user,
			status: "success",
		});

		localStorage.setItem("user", JSON.stringify(user));
		setTokens(tokens);
	};

	const updateUser = (user: User & unknown) => {
		setState((prev) => ({
			...state,
			user: {
				...prev.user,
				...user,
			},
		}));
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				login,
				logout,
				updateUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthState = () => {
	const state = useContext(AuthContext);

	const isPending = state.status === "pending";
	const isError = state.status === "error";
	const isSuccess = state.status === "success";

	const isAuthenticated = (state.user && isSuccess) ?? false;

	const logout = state?.logout ?? (() => {});
	const login = state?.login ?? (() => {});
	const signup = state?.signup ?? (() => {});
	const updateUser = state?.updateUser ?? (() => {});

	return {
		...state,
		isPending,
		isError,
		isSuccess,
		isAuthenticated,
		logout,
		login,
		signup,
		updateUser,
	};
};
