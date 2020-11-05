import React from "react";
import { useParams } from "react-router-dom";

import {
	ProgressBar,
	Tile,
	Block,
	Tabs,
	Tab,
	Image,
} from "@faramo.zayw/reabulma";
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

// prettier-ignore
const fakeImage = {
    src: "https://bulma.io/images/placeholders/480x480.png",
    alt: "Map screenshot"
}
// prettier-ignore
const fakeScreenshots = [{...fakeImage}, {...fakeImage}, {...fakeImage}, {...fakeImage}, {...fakeImage}];

export const Map = () => {
	const { isAuthenticated: isAuth, user } = useAuthState();
	const { mapID } = useParams<MapParams>();
	const { loading, data: mapData } = useGetMapByIdQuery({
		variables: { mapID },
	});

	const { author, name, description, ...props } = {
		...mapData?.map,
	} as MapType;

	const screenshots = fakeScreenshots;

	if (loading) {
		return (
			<Layout>
				<ProgressBar isColor="info" isSize="small" max="100" />
			</Layout>
		);
	}

	if (!mapData) {
		return <Layout>Error!</Layout>;
	}

	return (
		<Layout
			style={{
				flexFlow: "column",
			}}
		>
			<div className={styles.pageNav}>
				<nav
					className="breadcrumb"
					aria-label="breadcrumbs"
					style={{ fontSize: "1.2rem" }}
				>
					<ul>
						<li>
							<UserLink {...author} />
						</li>
						<li>
							<MapName name={name} to={`/maps/${mapData.map.id}`} />
						</li>
					</ul>
				</nav>
				<Tabs isBoxed isAlign="left" isSize="normal">
					<ul>
						<Tab isActive>
							<a>
								<span className="icon is-small">
									<i className="fas fa-info" aria-hidden="true"></i>
								</span>
								<span>Info</span>
							</a>
						</Tab>
						<Tab>
							<a>
								<span className="icon is-small">
									<i className="far fa-comments" aria-hidden="true"></i>
								</span>
								<span>Discussion</span>
							</a>
						</Tab>
						<Tab>
							<a>
								<span className="icon is-small">
									<i className="fas fa-exclamation" aria-hidden="true"></i>
								</span>
								<span>Issues</span>
							</a>
						</Tab>
						<Tab>
							<a>
								<span className="icon is-small">
									<i className="fas fa-cogs" aria-hidden="true"></i>
								</span>
								<span>Setting</span>
							</a>
						</Tab>
					</ul>
				</Tabs>
			</div>
			<Tile tag="section" isAncestor style={{ width: "100%" }}>
				<Tile isParent isVertical className="is-3">
					<Tile isChild>
						<Tile isChild className="content">
							<CoolBox title="common" className={styles.common}>
								<Block className={styles.config}>
									<MapConfig {...props} />
								</Block>
								<Block>
									<span>co-author: </span>
									<UserLink {...author} />, <UserLink {...author} />,{" "}
									<UserLink {...author} />
								</Block>
								<Block>
									<ForkButton
										isFullWidth
										isAuth={isAuth}
										userId={user?.id}
										ownerId={author.id}
									/>
								</Block>
							</CoolBox>
						</Tile>
					</Tile>
				</Tile>
				<Tile isParent isVertical style={{ alignSelf: "baseline" }}>
					{!!description?.trim() && (
						<Tile isChild className="content">
							<CoolBox title="description" className={styles.description}>
								<MarkdownRemark markdown={description} />
							</CoolBox>
						</Tile>
					)}
					<Tile isChild>
						<CoolBox title="screenshots" className={styles.screenshots}>
							<section>
								{screenshots.map(({ src, alt }) => (
									<Image isSize="128x128" src={src} alt={alt} />
								))}
							</section>
						</CoolBox>
					</Tile>
				</Tile>
			</Tile>
		</Layout>
	);
};
