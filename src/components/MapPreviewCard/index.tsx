import React from "react";
import { Link, useHistory } from "react-router-dom";

import { Button, Title, Content } from "./../../bulma";
import { MapConfig } from "./../../types";
import { deleteMap } from "./../../store/mapsStore";

import "./index.css";
import { PreviewCardInfo } from "./PreviewCardInfo";

export interface MapPreviewCardProps extends MapConfig {}

export const MapPreviewCard: React.FC<MapPreviewCardProps> = ({
	author,
	name,
	id,
	...props
}) => {
	const history = useHistory();

	const editHandler = () => history.push(`/editor/${id}`);
	const deleteHandler = () => deleteMap(id);

	return (
		<div className="MapPreviewCard card has-background-grey-dark has-text-primary-light is-clipped">
			<div className="card-content">
				<div className="media">
					<div className="media-left">
						<figure className="image is-48x48">
							<img
								src="https://bulma.io/images/placeholders/96x96.png"
								alt="Test image"
							/>
						</figure>
					</div>
					<div className="media-content">
						<Title isSize={4} className="mapname">
							{name}
						</Title>
						<Title tag="p" isSubtitle isSize={6} className="username">
							@{author}
						</Title>
					</div>
				</div>

				<PreviewCardInfo {...props} />
			</div>
			<footer className="card-footer">
				<Button
					className="card-footer-item"
					isColor="success"
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
