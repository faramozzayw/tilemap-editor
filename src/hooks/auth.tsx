import React, { createContext, useState, useContext, useEffect } from "react";

import { User, Tokens } from "./../types";
import {
	setTokensToCookies,
	isAuthenticatedByToken,
	removeTokens,
} from "./utils";

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
}

export const initialState: AuthContextState = {
	status: "pending",
	error: null,
	user: null,
};

export const AuthContext = createContext<AuthContextState>(initialState);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [state, setState] = useState<AuthContextState>({ ...initialState });

	useEffect(() => {
		const isAuth = isAuthenticatedByToken();

		const status: AuthStatus = isAuth ? "success" : "error";
		const rawUser = localStorage?.getItem("user");

		let user: User | null = null;

		if (isAuth && rawUser) {
			user = JSON.parse(rawUser);
		}

		setState({
			...initialState,
			status,
			user,
		});
	}, [setState]);

	const logout = () => {
		setState({
			...state,
			user: null,
			status: "pending",
		});

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
		setTokensToCookies(tokens);
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				login,
				logout,
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

	return {
		...state,
		isPending,
		isError,
		isSuccess,
		isAuthenticated,
		logout,
		login,
		signup,
	};
};
