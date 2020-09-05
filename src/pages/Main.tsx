import React from "react";
import { useQuery } from "@apollo/client";

import { MainNavbar } from "./../components";
import { Hero, HeroHeader, HeroBody } from "./../bulma";

import { useAuthState } from "../hooks/auth";
import { MapConfig } from "../types";
import { MapFeed } from "../components/MapPreviewCard";
import { GET_MAPS_PAGINATION } from "../graphql";
import { Layout } from "../common";

interface MapConfigData {
	maps: MapConfig[];
}

const limit = 10;

export const Main = () => {
	const { isAuthenticated: isAuth } = useAuthState();

	const { loading, error, data, fetchMore } = useQuery<MapConfigData>(
		GET_MAPS_PAGINATION,
		{
			variables: {
				offset: 0,
				limit,
			},
			fetchPolicy: "cache-and-network",
		},
	);

	return (
		<Layout style={{ flexFlow: "column" }}>
			<MapFeed
				loading={loading}
				error={error}
				isAuth={isAuth}
				maps={data?.maps}
				onLoadMore={() => {
					fetchMore({
						variables: {
							offset: data?.maps.length,
						},
						updateQuery: (prev, { fetchMoreResult }) => {
							if (!fetchMoreResult) return prev;
							return Object.assign({}, prev, {
								maps: [...prev.maps, ...fetchMoreResult.maps],
							});
						},
					});
				}}
			/>
		</Layout>
	);
};
