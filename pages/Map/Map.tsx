import React from "react";
import { useParams, Route } from "react-router-dom";

import { ProgressBar } from "@faramo.zayw/reabulma";
import { useGetMapByIdQuery, Map as MapType, User } from "../../types/graphql";
import { Layout } from "../../common";

import { useAuthState } from "../../hooks/auth";
import { MapInfo } from "./MapInfo";
import { MapSetting } from "./MapSetting";
import { MapNavbar } from "./MapNavbar";

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
	const { isAuthenticated, user } = useAuthState();
	const { mapID } = useParams<MapParams>();
	const { loading, data: mapData } = useGetMapByIdQuery({
		variables: { mapID },
	});

	const currentMap = {
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
			<MapNavbar {...currentMap} currentUser={user as User} />
			<Route
				path="/maps/:mapID/setting"
				component={() => <MapSetting {...currentMap} />}
			/>
			<Route
				exact
				path="/maps/:mapID/"
				component={() => (
					<MapInfo
						{...currentMap}
						user={user as any}
						screenshots={screenshots}
					/>
				)}
			/>
		</Layout>
	);
};
