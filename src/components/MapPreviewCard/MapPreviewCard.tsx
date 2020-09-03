import React from "react";
import { useHistory } from "react-router-dom";

import { Title, Card, CardContent } from "./../../bulma";
import { MapConfig } from "./../../types";

import "./index.css";
import { PreviewCardInfo } from "./PreviewCardInfo";
import { IAuth } from "../../types/auth";
import { PreviewCardFooter } from "./PreviewCardFooter";
import { UserLink } from "../../common";

export interface MapPreviewCardProps extends MapConfig, IAuth {}

export const MapPreviewCard: React.FC<MapPreviewCardProps> = ({
	author,
	name,
	id,
	isAuth,
	...props
}) => {
	const history = useHistory();
	const editHandler = () => history.push(`/editor/${id}`);
	const forkHandler = () => alert("forked!");
	const viewHandler = () => history.push(`/maps/${id}`);

	return (
		<Card className="MapPreviewCard has-background-grey-dark has-text-primary-light is-clipped">
			<CardContent>
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
						<Title tag="p" isSubtitle isSize={6}>
							<UserLink username={author} />
						</Title>
					</div>
				</div>

				<PreviewCardInfo {...props} />
			</CardContent>
			{isAuth && (
				<PreviewCardFooter
					id={id}
					viewHandler={viewHandler}
					editHandler={editHandler}
					forkHandler={forkHandler}
				/>
			)}
		</Card>
	);
};
