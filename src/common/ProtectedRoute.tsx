import React from "react";

import { Route, Redirect, RouteProps } from "react-router-dom";

export interface ProtectedRouterProps extends RouteProps {
	isAuth?: boolean;
	component: any;
}

export const ProtectedRouter: React.FC<ProtectedRouterProps> = ({
	isAuth,
	component: Component,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuth ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/",
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
};
