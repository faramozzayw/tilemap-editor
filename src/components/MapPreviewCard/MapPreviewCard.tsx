import React, { CSSProperties, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Transition } from "react-transition-group";

import {
	Title,
	Card,
	CardContent,
	Image,
	CardImage,
} from "@faramo.zayw/reabulma";

import "./index.css";
import { MapConfig } from "./MapConfig";
import { IAuth } from "../../types/auth";
import { PreviewCardFooter } from "./PreviewCardFooter";
import { UserLink, MapName, Can } from "../../common";
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
				<article
					className="MapPreviewCard"
					style={{
						...defaultStyle,
						...transitionStyles[state],
					}}
				>
					<div className="image-wrapper">
						<Image
							isRounded
							isSize="128x128"
							src="https://lh3.googleusercontent.com/proxy/wWaA4wQuzFpjH4iIEqWhXreE9GnwGZJj244vrO_1c-6Sw5G7Dn3WJR1kevtiKk4SsjYkRzyjtvLNroSsu0cf8GQ8bRKHURfYYN2lrJdb7kX7ds_UqJocYwzTpKanc6-YqxojvyksY3XGAEdzNV_rnsui9lZqaw0_KUUvFX1QKsmaefAz4T9kyGditmmhbhfe3SYDVEc"
							alt="Preview"
							style={{
								margin: "auto",
							}}
						/>
					</div>
					<Card>
						<CardContent className="has-background-grey-dark has-text-primary-light">
							<div className="media">
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
								<Can role={isAuth ? "user" : ""} perform="like:map">
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
								</Can>
							</div>

							<MapConfig {...props} />
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
				</article>
			)}
		</Transition>
	);
};
