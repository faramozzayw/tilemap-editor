import React from "react";

import { canFork, UserIsOwned } from "../rbac/utils";

import { Button } from "../../bulma";
import { Bulma } from "../../bulma/bulma";

export interface ForkButton
	extends UserIsOwned,
		Bulma.FullWidth,
		React.HtmlHTMLAttributes<HTMLButtonElement> {
	isAuth?: boolean;
}

export const ForkButton: React.FC<ForkButton> = ({
	userId,
	ownerId,
	isAuth,
	isFullWidth,
	className,
}) => {
	return (
		<Button
			className={className}
			isFullWidth={isFullWidth}
			isColor="warning"
			onClick={() => alert("FORKED!")}
			disabled={!canFork({ userId, ownerId, isAuth })}
		>
			<span>
				<i className="fas fa-code-branch"></i> Fork
			</span>
		</Button>
	);
};
