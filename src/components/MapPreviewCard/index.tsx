import React from "react";
import { Button } from "./../../bulma";

import { MapConfig } from "./../../types";

import "./index.css";

export interface MapPreviewCardProps extends MapConfig {}

export const MapPreviewCard: React.FC<MapPreviewCardProps> = ({
	author,
	name,
	description,
	size,
	create_data,
	last_edit,
}) => {
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
						{last_edit?.toLocaleDateString() ?? "not edited yet"}
					</time>
				</div>
			</div>
			<footer className="card-footer">
				<Button isOutlined isColor="success" className="card-footer-item">
					Edit
				</Button>
				<Button isColor="danger" className="card-footer-item ">
					Delete
				</Button>
			</footer>
		</div>
	);
};
