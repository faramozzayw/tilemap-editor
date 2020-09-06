import React from "react";
import { useParams } from "react-router-dom";
import classnames from "classnames";

import { useAuthState } from "../hooks/auth";
import { Layout } from "../common";

import {
	ProfilePic,
	ProfileTitle,
	ProfileInfo,
	ProfileDescription,
} from "../components/Profile";

import ProfilePicStyle from "../components/Profile/ProfilePic.module.css";
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
		onError: (e) => console.error(e),
		fetchPolicy: "cache-and-network",
	});

	const { loading, error, data: mapsData, fetchMore } = useGetMapsByUserQuery({
		variables: {
			username,
			offset: 0,
			limit: 5,
		},
		onError: (e) => console.error(e),
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
					<Tile isChild className={classnames("content", ProfilePicStyle.Box)}>
						<ProfilePic />
						<ProfileTitle>Status</ProfileTitle>
						<ProfileDescription
							description={
								"`code` *italic* **bold** [link](https://localhost:300/)"
							}
						/>
					</Tile>
					<Tile isChild className={classnames("content", ProfilePicStyle.Box)}>
						<ProfileTitle>Roles</ProfileTitle>
						<div className="tags">
							<span className="tag is-danger">Admin</span>
							<span className="tag is-link">Moderator</span>
							<span className="tag is-light">User</span>
						</div>
					</Tile>
				</Tile>
				<Tile isParent>
					<Tile isChild className={classnames("content", ProfilePicStyle.Box)}>
						<ProfileTitle>Bio</ProfileTitle>
						{user && <ProfileInfo user={user} isAuth={isAuth} />}
					</Tile>
				</Tile>
			</Tile>
			<section className={ProfilePicStyle.Box}>
				<ProfileTitle>{`__${user?.username}'s maps~`}</ProfileTitle>
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
			</section>
		</Layout>
	);
};
