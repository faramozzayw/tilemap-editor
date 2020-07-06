import React from "react";
import { Button } from "./../../bulma";

import "./index.css";

export const MapPreviewCard = () => {
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
						<p className="title is-4">John Smith</p>
						<p className="subtitle is-6">@johnsmith</p>
					</div>
				</div>

				<div className="content">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
					iaculis mauris. <a>@bulmaio</a>.<a href="#">#css</a>{" "}
					<a href="#">#responsive</a>
					<br />
					<time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
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
