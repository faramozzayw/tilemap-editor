import React from "react";

export interface ProtectedProps {
	isAuth?: boolean;
	render: Function;
	fail?: Function;
}

/**
 * Returns the render-component if the user is authenticated
 *
 * @param {Function} render - a function that returns a component to display
 * @param {boolean=} isAuth - user authentication status
 * @param {Function=} fail - a function that returns a component to display in case of an error
 */

export const Protected: React.FC<ProtectedProps> = ({
	isAuth,
	render,
	fail,
}) => {
	if (!isAuth) {
		if (fail) {
			return fail();
		}
		return null;
	}

	return render();
};
