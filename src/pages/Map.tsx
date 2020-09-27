import React from "react";
import classnames from "classnames";
import { useParams } from "react-router-dom";

import { ProgressBar, Title, Tile } from "@faramo.zayw/reabulma";
import { useGetMapByIdQuery, Map as MapType } from "../types/graphql";
import {
	Layout,
	UserLink,
	MarkdownRemark,
	CoolBox,
	MapName,
	ForkButton,
} from "../common";
import { MapConfig } from "../components/MapPreviewCard";

import styles from "./Map.module.css";
import { useAuthState } from "../hooks/auth";

export interface MapParams {
	mapID: string;
}

export const Key: React.FC = ({ children }) => (
	<span className="has-text-primary has-text-weight-bold">{children}</span>
);

export const Map = () => {
	const { isAuthenticated: isAuth, user } = useAuthState();
	const { mapID } = useParams<MapParams>();
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
								<Title isSize={3}>
									<MapName name={name} />
								</Title>
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
							<div className="block">
								<aside className={styles.config}>
									<MapConfig {...props} />
								</aside>
							</div>
							<div className="block">
								<ForkButton
									isFullWidth
									isAuth={isAuth}
									userId={user?.id}
									ownerId={author.id}
								/>
							</div>
							{/*
                            <Button isColor="danger" isFullWidth>
                                <span>
                                    <i className="far fa-trash-alt"></i> Delete map!
                                </span>
                            </Button>
                            */}
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
