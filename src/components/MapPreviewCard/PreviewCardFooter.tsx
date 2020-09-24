import React from "react";
import { Button, CardFooter } from "./../../bulma";
import { Map } from "../../types/graphql";
import { Can, ForkButton } from "../../common";
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
			<ForkButton
				userId={authUser?.id}
				ownerId={authorID}
				isAuth={isAuth}
				className="card-footer-item"
			/>
		</CardFooter>
	);
};
