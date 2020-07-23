import React from "react";
import { Button } from "../../bulma";

export const LogOut = () => {
	const logOut = () => {
		// do something...
	};

	return (
		<div className="navbar-end">
			<div className="navbar-item">
				<div className="buttons">
					<Button isOutlined isColor="danger">
						Log out
					</Button>
				</div>
			</div>
		</div>
	);
};
