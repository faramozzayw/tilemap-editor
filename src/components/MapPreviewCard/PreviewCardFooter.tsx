import React from "react";
import {
	Button,
	Title,
	Content,
	Card,
	CardContent,
	CardFooter,
} from "./../../bulma";
import { Link } from "react-router-dom";
import { MapConfig } from "../../types";

export interface PreviewCardFooterProps extends Pick<MapConfig, "id"> {
	editHandler: any;
	forkHandler: any;
	deleteHandler: any;
}

export const PreviewCardFooter: React.FC<PreviewCardFooterProps> = ({
	id,
	editHandler,
	forkHandler,
	deleteHandler,
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
		<Button
			className="card-footer-item"
			isColor="danger"
			onClick={deleteHandler}
		>
			Delete
		</Button>
	</CardFooter>
);
