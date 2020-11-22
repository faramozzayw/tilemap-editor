import React from "react";
import { useParams, NavLink, Route } from "react-router-dom";

import { ProgressBar, Tabs, Tab } from "@faramo.zayw/reabulma";
import { useGetMapByIdQuery, Map as MapType } from "../../types/graphql";
import { Layout, UserLink, MapName, CoolBox } from "../../common";

import styles from "./Map.module.css";
import { useAuthState } from "../../hooks/auth";
import { MapInfo } from "./MapInfo";

export interface MapParams {
	mapID: string;
}

export const Key: React.FC = ({ children }) => (
	<span className="has-text-primary has-text-weight-bold">{children}</span>
);

// prettier-ignore
export const fakeImage = {
    src: "https://bulma.io/images/placeholders/480x480.png",
    alt: "Map screenshot"
}
// prettier-ignore
export const fakeScreenshots = [{...fakeImage}, {...fakeImage}, {...fakeImage}, {...fakeImage}, {...fakeImage}];

export const Map = () => {
	const { isAuthenticated: isAuth, user } = useAuthState();
	const { mapID } = useParams<MapParams>();
	const { loading, data: mapData } = useGetMapByIdQuery({
		variables: { mapID },
	});

	const { author, name, ...props } = {
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
				<Tabs isBoxed isAlign="left" isSize="normal" className="scrollbar">
					<ul>
						<Tab isActive>
							<NavLink to={`/maps/${mapData.map.id}/`} exact>
								<span className="icon is-small">
									<i className="fas fa-info" aria-hidden="true"></i>
								</span>
								<span>Info</span>
							</NavLink>
						</Tab>
						<Tab>
							<NavLink to={`/maps/${mapData.map.id}/discussion`}>
								<span className="icon is-small">
									<i className="far fa-comments" aria-hidden="true"></i>
								</span>
								<span>Discussion</span>
							</NavLink>
						</Tab>
						<Tab>
							<NavLink to={`/maps/${mapData.map.id}/issues`}>
								<span className="icon is-small">
									<i className="fas fa-exclamation" aria-hidden="true"></i>
								</span>
								<span>Issues</span>
							</NavLink>
						</Tab>
						<Tab>
							<NavLink to={`/maps/${mapData.map.id}/setting`}>
								<span className="icon is-small">
									<i className="fas fa-cogs" aria-hidden="true"></i>
								</span>
								<span>Setting</span>
							</NavLink>
						</Tab>
					</ul>
				</Tabs>
			</div>
			<div>
				<Route
					exact
					path="/maps/:mapID/"
					component={() => (
						<MapInfo
							{...props}
							user={user as any}
							author={author}
							name={name}
							screenshots={screenshots}
						/>
					)}
				/>
			</div>
		</Layout>
	);
};
