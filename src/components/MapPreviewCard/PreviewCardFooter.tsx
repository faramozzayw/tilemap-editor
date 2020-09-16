import React from "react";
import { Button, CardFooter } from "./../../bulma";
import { Map } from "../../types/graphql";
import { Can } from "../../common";
import { IAuth } from "../../types/auth";
import { useAuthState } from "../../hooks/auth";
import { canFork } from "../../common/rbac/utils";

export interface PreviewCardFooterProps
	extends Pick<Map, "id" | "author">,
		IAuth {
	editHandler: () => void;
	forkHandler: () => void;
	viewHandler: () => void;
}

export const PreviewCardFooter: React.FC<PreviewCardFooterProps> = ({
	id: mapID,
	forkHandler,
	viewHandler,
	isAuth,
	author,
}) => {
	const { user: authUser } = useAuthState();
	const { id: authorID } = author;

	return (
		<CardFooter>
			<Button
				className="card-footer-item"
				isColor="success"
				onClick={viewHandler}
			>
				<span>
					<i className="far fa-eye"></i> View
				</span>
			</Button>
			<Button
				className="card-footer-item"
				isColor="warning"
				onClick={forkHandler}
				disabled={canFork({ userId: authUser?.id, ownerId: authorID, isAuth })}
			>
				<span>
					<i className="fas fa-code-branch"></i> Fork
				</span>
			</Button>
		</CardFooter>
	);
};
