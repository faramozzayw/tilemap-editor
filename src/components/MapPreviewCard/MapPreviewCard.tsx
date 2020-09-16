import React, { CSSProperties, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Transition } from "react-transition-group";

import { Title, Card, CardContent } from "./../../bulma";

import "./index.css";
import { PreviewCardInfo } from "./PreviewCardInfo";
import { IAuth } from "../../types/auth";
import { PreviewCardFooter } from "./PreviewCardFooter";
import { UserLink, MapName } from "../../common";
import { Map } from "../../types/graphql";

export interface MapPreviewCardProps extends Map, IAuth {}

const duration = 200;

const defaultStyle: CSSProperties = {
	transition: `opacity ${duration}ms ease-in-out`,
	opacity: 0,
};

const transitionStyles: any = {
	entering: { opacity: 1 },
	entered: { opacity: 1 },
	exiting: { opacity: 0 },
	exited: { opacity: 0 },
};

export const MapPreviewCard: React.FC<MapPreviewCardProps> = ({
	author,
	name,
	id,
	isAuth,
	...props
}) => {
	const history = useHistory();
	const [inProp, setInProp] = useState(false);
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		setTimeout(() => setInProp(true), duration);
	}, [setInProp]);

	if (!author) {
		return null;
	}

	const editHandler = () => history.push(`/editor/${id}`);
	const forkHandler = () => alert("forked!");
	const viewHandler = () => history.push(`/maps/${id}`);

	return (
		<Transition in={inProp} timeout={duration}>
			{(state) => (
				<Card
					className="MapPreviewCard has-background-grey-dark has-text-primary-light is-clipped"
					tag="article"
					style={{
						...defaultStyle,
						...transitionStyles[state],
					}}
				>
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
								<Title isSize={4}>
									<Link to={`/maps/${id}`}>
										<MapName name={name} />
									</Link>
								</Title>
								<Title tag="p" isSubtitle isSize={6}>
									<UserLink username={author.username} />
								</Title>
							</div>
							<div className="media-right">
								<button
									className="like-button"
									onClick={() => setLiked((prev) => !prev)}
								>
									{liked ? (
										<i className="fas fa-heart has-text-danger"></i>
									) : (
										<i className="fas fa-heart-broken has-text-grey-light"></i>
									)}
								</button>
							</div>
						</div>

						<PreviewCardInfo {...props} />
					</CardContent>
					<PreviewCardFooter
						id={id}
						author={author}
						isAuth={isAuth}
						viewHandler={viewHandler}
						editHandler={editHandler}
						forkHandler={forkHandler}
					/>
				</Card>
			)}
		</Transition>
	);
};
