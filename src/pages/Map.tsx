import React from "react";
import classnames from "classnames";
import { useParams } from "react-router-dom";

import { ProgressBar, Title as BulmaTitle, Tile } from "../bulma";
import { useGetMapByIdQuery, Map as MapType } from "../types/graphql";
import {
	Layout,
	UserLink,
	MarkdownRemark,
	CoolBox,
	Title,
	MapName,
} from "../common";
import { MapConfig } from "../components/MapPreviewCard";

import styles from "./Map.module.css";

export const Key: React.FC = ({ children }) => (
	<span className="has-text-primary has-text-weight-bold">{children}</span>
);

/*
background: linear-gradient(0deg, #1f0f1d, #3a6380);
color: aliceblue;
*/

export const Map = () => {
	const { mapID } = useParams();
	const { loading, data: mapData } = useGetMapByIdQuery({
		variables: { mapID },
	});

	const { author, name, description, ...props } = {
		...mapData?.map,
	} as MapType;

	return (
		<Layout style={{ alignItems: "flex-start" }}>
			{loading && <ProgressBar isColor="info" isSize="small" max="100" />}
			{mapData && (
				<Tile tag="section" isAncestor>
					<Tile isVertical isParent className="is-3">
						<Tile isChild className="content">
							<article className={classnames(styles.basic)}>
								<BulmaTitle isSize={3}>
									<MapName name={name} />
								</BulmaTitle>
								<p>
									<span>author: </span>
									<UserLink {...author} />
								</p>
								<p>
									<span>co-author: </span>
									<UserLink {...author} />, <UserLink {...author} />,{" "}
									<UserLink {...author} />
								</p>
							</article>
							<aside className={styles.config}>
								<MapConfig {...props} />
							</aside>
						</Tile>
					</Tile>
					<Tile isParent isVertical>
						{!!description?.trim() && (
							<Tile isChild className="content">
								<CoolBox title={"description"} className={styles.description}>
									<MarkdownRemark markdown={description} />
								</CoolBox>
							</Tile>
						)}
						<Tile isChild>
							<CoolBox title={"screenshot"} className={styles.screenshots}>
								<div
									style={{
										display: "flex",
										flexWrap: "wrap",
										alignItems: "center",
										justifyContent: "space-around",
									}}
								>
									<figure className="image is-128x128">
										<img src="https://bulma.io/images/placeholders/480x480.png" />
									</figure>
									<figure className="image is-128x128">
										<img src="https://bulma.io/images/placeholders/480x480.png" />
									</figure>
									<figure className="image is-128x128">
										<img src="https://bulma.io/images/placeholders/480x480.png" />
									</figure>
									<figure className="image is-128x128">
										<img src="https://bulma.io/images/placeholders/480x480.png" />
									</figure>
								</div>
							</CoolBox>
						</Tile>
					</Tile>
				</Tile>
			)}
		</Layout>
	);
};
