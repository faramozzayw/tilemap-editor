import React from "react";
import { useParams } from "react-router-dom";

import { useAuthState } from "../hooks/auth";
import { Layout, Box, Title } from "../common";

import {
	ProfilePic,
	ProfileInfo,
	ProfileDescription,
} from "../components/Profile";

import { MapFeed } from "../components/MapPreviewCard";
import {
	useGetMapsByUserQuery,
	useGetUserByUsernameQuery,
} from "../types/graphql";
import { ProgressBar, Tile } from "../bulma";

const style: React.CSSProperties = { display: "grid" };

export const ProfilePage = () => {
	const { username } = useParams();
	const { isAuthenticated: isAuth } = useAuthState();

	const { data: userData } = useGetUserByUsernameQuery({
		variables: { username },
		onError: console.error,
		fetchPolicy: "cache-and-network",
	});

	const { loading, error, data: mapsData, fetchMore } = useGetMapsByUserQuery({
		variables: {
			username,
			offset: 0,
			limit: 5,
		},
		onError: console.error,
		fetchPolicy: "cache-and-network",
	});

	const user = userData?.getUserByUsername;

	if (loading) {
		return (
			<Layout style={style}>
				<ProgressBar isColor="info" isSize="small" max="100" />
			</Layout>
		);
	}

	return (
		<Layout style={style}>
			<Tile isAncestor tag="section">
				<Tile isVertical isParent className="is-3">
					<Tile isChild className="content">
						<Box>
							<ProfilePic />
							<Title>Status</Title>
							<ProfileDescription
								description={
									"`code` *italic* **bold** [link](https://localhost:300/)"
								}
							/>
						</Box>
					</Tile>
					<Tile isChild className="content">
						<Box>
							<Title>Roles</Title>
							<div className="tags">
								<span className="tag is-danger">Admin</span>
								<span className="tag is-link">Moderator</span>
								<span className="tag is-light">User</span>
							</div>
						</Box>
					</Tile>
				</Tile>
				<Tile isParent>
					<Tile isChild className="content">
						<Box>
							<Title>Bio</Title>
							{user && <ProfileInfo user={user} isAuth={isAuth} />}
						</Box>
					</Tile>
				</Tile>
			</Tile>
			<section>
				<Box>
					<Title>{`__${user?.username}'s maps~`}</Title>
					<MapFeed
						loading={loading}
						error={error}
						isAuth={isAuth}
						maps={mapsData?.maps}
						onLoadMore={() => {
							fetchMore({
								variables: {
									offset: mapsData?.maps.length,
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
				</Box>
			</section>
		</Layout>
	);
};
