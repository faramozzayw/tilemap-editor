import React, { CSSProperties, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Transition } from "react-transition-group";

import { Title, Card, CardContent, Image } from "@faramo.zayw/reabulma";

import "./index.css";
import { MapConfig } from "./MapConfig";
import { IAuth } from "../../types/auth";
import { UserLink, MapName, Can, CoolBox, MarkdownRemark } from "../../common";
import { Map } from "../../types/graphql";

import { Key } from "./MapConfig";

import fakeImage from "./fake.jpg";

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

/*
<Can role={isAuth ? "user" : ""} perform="like:map"></Can>
*/

/*
title={<MapName name={name} to={`/maps/${id}`} />}
*/

export const MapPreviewCard: React.FC<MapPreviewCardProps> = ({
	author,
	name,
	id,
	isAuth,
	description,
	size,
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
					<CoolBox>
						<Link to={`/maps/${id}`}>
							<Image src={fakeImage} />
						</Link>
						<div className="mapContent">
							<div className="summary">
								<p>
									<Key>Map size:</Key> {size.row} x {size.column}
								</p>
								<p>
									<Key>Create:</Key>{" "}
									<time dateTime="2016-1-1">
										{new Date(props.createdAt).toLocaleDateString()}
									</time>
								</p>
								<p>
									<Key>Last edit:</Key>{" "}
									<time dateTime="2016-1-1">
										{props.updatedAt
											? new Date(props.updatedAt).toLocaleDateString()
											: "not edited yet"}
									</time>
								</p>
								<p>
									<Key>Auhtor:</Key> <UserLink username={author.username} />
								</p>
							</div>
							<MarkdownRemark markdown={description} />
						</div>
						<div className="activitySummary">
							<span className="icon">
								<i className="fas fa-database"></i>
								<span>142mb</span>
							</span>
							<span className="icon">
								<i className="fas fa-heart"></i>
								<span>150k</span>
							</span>
							<span className="icon">
								<i className="fas fa-download"></i>
								<span>150k</span>
							</span>
						</div>
					</CoolBox>
				</article>
			)}
		</Transition>
	);
};
