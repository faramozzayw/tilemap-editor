import React from "react";
import { Link, useHistory } from "react-router-dom";

import { Button } from "./../../bulma";
import { MapConfig } from "./../../types";
import { deleteMap } from "./../../store/mapsStore";

import "./index.css";

export interface MapPreviewCardProps extends MapConfig {}

export const MapPreviewCard: React.FC<MapPreviewCardProps> = ({
	author,
	name,
	description,
	size,
	create_data,
	last_edit,
	id,
}) => {
	const history = useHistory();

	const editHandler = () => history.push(`/editor/${id}`);
	const deleteHandler = () => deleteMap(id);

	return (
		<div className="MapPreviewCard card has-background-grey-dark has-text-primary-light">
			<div className="card-content">
				<div className="media">
					<div className="media-left">
						<figure className="image is-48x48">
							<img
								src="https://bulma.io/images/placeholders/96x96.png"
								alt="Placeholder image"
							/>
						</figure>
					</div>
					<div className="media-content">
						<p className="title is-4">{name}</p>
						<p className="subtitle is-6">@{author}</p>
					</div>
				</div>

				<div className="content">
					{description}
					{description && <br />}
					Map size: {size.row} x {size.column}
					<br />
					Create:{" "}
					<time dateTime="2016-1-1">{create_data.toLocaleDateString()}</time>
					<br />
					Last edit:{" "}
					<time dateTime="2016-1-1">
						{last_edit?.toLocaleString() ?? "not edited yet"}
					</time>
				</div>
			</div>
			<footer className="card-footer">
				<Button
					className="card-footer-item"
					isColor="success"
					isOutlined
					onClick={editHandler}
				>
					<Link to={`/editor/${id}`}>Edit</Link>
				</Button>
				<Button
					className="card-footer-item"
					isColor="danger"
					onClick={deleteHandler}
				>
					Delete
				</Button>
			</footer>
		</div>
	);
};
