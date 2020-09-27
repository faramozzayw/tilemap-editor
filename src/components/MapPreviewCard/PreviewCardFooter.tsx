import React from "react";
import { Button, CardFooter } from "@faramo.zayw/reabulma";
import { Map } from "../../types/graphql";
import { ForkButton } from "../../common";
import { IAuth } from "../../types/auth";
import { useAuthState } from "../../hooks/auth";

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
