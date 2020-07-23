import React from "react";

export interface ProtectedProps {
	isAuth?: boolean;
	render: Function;
	fail?: Function;
}

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
