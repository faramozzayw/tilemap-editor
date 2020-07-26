import React from "react";

import { Route, Redirect, RouteProps } from "react-router-dom";

export interface ProtectedRouterProps extends RouteProps {
	isAuth?: boolean;
	children: any;
}

export const ProtectedRouter: React.FC<ProtectedRouterProps> = ({
	isAuth,
	children: Component,
	...props
}) => {
	return (
		<Route
			{...props}
			render={(props) =>
				isAuth ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	);
};
