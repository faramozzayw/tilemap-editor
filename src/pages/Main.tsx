import React from "react";

import { useAuthState } from "../hooks/auth";
import { MapFeed } from "../components/MapPreviewCard";
import { Layout } from "../common";
import { useMapsPaginationQuery } from "../types/graphql";

export const Main = () => {
	const { isAuthenticated: isAuth } = useAuthState();

	const { loading, error, data, fetchMore, refetch } = useMapsPaginationQuery({
		variables: {
			first: 5,
		},
		fetchPolicy: "cache-and-network",
		onError: console.error,
	});

	const nodes = data?.mapsPagination?.edges?.map((edge) => edge.node);

	return (
		<Layout style={{ flexFlow: "column" }}>
			<MapFeed
				loading={loading}
				error={error}
				isAuth={isAuth}
				maps={nodes}
				refetch={refetch}
				onLoadMore={() => {
					fetchMore({
						variables: {
							after: data?.mapsPagination.pageInfo?.endCursor,
						},
					});
				}}
			/>
		</Layout>
	);
};
