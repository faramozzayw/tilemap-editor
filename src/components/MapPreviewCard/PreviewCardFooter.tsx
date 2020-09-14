import React from "react";
import { Button, CardFooter } from "./../../bulma";
import { Link } from "react-router-dom";
import { Map } from "../../types/graphql";

export interface PreviewCardFooterProps extends Pick<Map, "id"> {
	editHandler: () => void;
	forkHandler: () => void;
	viewHandler: () => void;
}

export const PreviewCardFooter: React.FC<PreviewCardFooterProps> = ({
	id,
	editHandler,
	forkHandler,
	viewHandler,
}) => (
	<CardFooter>
		<Button
			className="card-footer-item"
			isColor="success"
			onClick={editHandler}
		>
			<Link to={`/editor/${id}`}>Edit</Link>
		</Button>
		<Button className="card-footer-item" isColor="info" onClick={forkHandler}>
			Fork
		</Button>
		<Button className="card-footer-item" isColor="danger" onClick={viewHandler}>
			View
		</Button>
	</CardFooter>
);
