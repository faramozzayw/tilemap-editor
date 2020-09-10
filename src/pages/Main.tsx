import React from "react";

import { useAuthState } from "../hooks/auth";
import { MapFeed } from "../components/MapPreviewCard";
import { Layout } from "../common";
import { useGetMapsPaginationQuery } from "../types/graphql";

const limit = 10;

export const Main = () => {
	const { isAuthenticated: isAuth } = useAuthState();

	const { loading, error, data, fetchMore } = useGetMapsPaginationQuery({
		variables: {
			offset: 0,
			limit,
		},
		fetchPolicy: "cache-and-network",
	});

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
