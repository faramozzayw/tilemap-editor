import React, { CSSProperties, useState, useEffect } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";

import { Title, Image } from "@faramo.zayw/reabulma";

import { IAuth } from "../../types/auth";
import { UserLink, MapName, Can, MarkdownRemark } from "../../common";
import { Map } from "../../types/graphql";
import { Key } from "./MapConfig";
import { LikeButton } from "./LikeButton";

import "./../../masonry.css";
import styles from "./MapCard.module.css";

import fakeImage from "./fake.jpg";

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
export interface MapCardProps extends Map, IAuth {}

const getPreviewText = (text?: string | null) => {
	if (!text) return null;
	const max = 150;
	const min = 0;

	if (text.length <= max) return text;

	return text.slice(min, max).concat("...");
};

export const MapCard: React.FC<MapCardProps> = ({
	author,
	name,
	id,
	isAuth,
	description,
	size,
	...props
}) => {
	const [inProp, setInProp] = useState(false);
	const [liked, setLiked] = useState(false);
	const toggleLike = () => setLiked((prev) => !prev);

	useEffect(() => {
		setTimeout(() => setInProp(true), duration);
	}, [setInProp]);

	if (!author) {
		return null;
	}

	return (
		<Transition in={inProp} timeout={duration}>
			{(state) => (
				<div
					className="masonry-card"
					style={{
						...defaultStyle,
						...transitionStyles[state],
					}}
				>
					<article className={classnames("is-relative", styles.MapCard)}>
						<Title tag="h3" isSize="3" className={styles.title}>
							<MapName name={name} to={`/maps/${id}`} />
						</Title>
						<Can role={isAuth ? "user" : ""} perform="like:map">
							<LikeButton isLiked={liked} onClick={toggleLike} />
						</Can>
						<Link to={`/maps/${id}`}>
							<Image src={fakeImage} />
						</Link>
						<div className={styles.mapContent}>
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
							<MarkdownRemark markdown={getPreviewText(description)} />
						</div>
						<div className={styles.activitySummary}>
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
					</article>
				</div>
			)}
		</Transition>
	);
};
