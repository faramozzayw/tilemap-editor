import React, { createContext, useState, useContext } from "react";

export interface AuthProviderProps {
	children: React.ReactChild;
}

export interface User {
	username: string;
	[key: string]: any;
}

export interface AuthContextState {
	status: "pending" | "error" | "success";
	error: Error | null;
	user: User | null;
	logout?: () => any;
	signup?: () => any;
	login?: (user: User) => any;
}

export const initialState: AuthContextState = {
	status: "pending",
	error: null,
	user: null,
};

export const AuthContext = createContext<AuthContextState>(initialState);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [state, setState] = useState<AuthContextState>({ ...initialState });

	const logout = () => {
		setState({
			...state,
			user: null,
			status: "pending",
		});
	};

	const login = (user: User) => {
		setState({
			...state,
			user,
			status: "success",
		});
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
