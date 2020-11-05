import React from "react";
import { useParams } from "react-router-dom";
import { ProgressBar, Tile } from "@faramo.zayw/reabulma";

import { useAuthState } from "../hooks/auth";
import { Layout, CoolBox, MarkdownRemark } from "../common";

import { ProfilePic, ProfileInfo } from "../components/Profile";

import { MapFeed } from "../components/MapPreviewCard";
import {
	useGetMapsByUserQuery,
	useGetUserByUsernameQuery,
} from "../types/graphql";
import styles from "./Profile.module.css";

export interface ProfilePageParams {
	username: string;
}

export const ProfilePage = () => {
	const { username } = useParams<ProfilePageParams>();
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
			<Layout>
				<ProgressBar isColor="info" isSize="small" max="100" />
			</Layout>
		);
	}

	if (!user) {
		return <Layout>Error!</Layout>;
	}

	return (
		<Layout
			style={{
				flexFlow: "column",
			}}
		>
			<Tile tag="section" isAncestor style={{ width: "100%" }}>
				<Tile isParent isVertical className="is-3">
					<Tile isChild>
						<CoolBox title="Status" className={styles.status}>
							<ProfilePic />
							<MarkdownRemark
								markdown={
									"`code` *italic* **bold** [link](https://localhost:300/)"
								}
							/>
						</CoolBox>
					</Tile>
					<Tile isChild className="content">
						<CoolBox title="Roles">
							<div className="tags">
								<span className="tag is-danger">Admin</span>
								<span className="tag is-link">Moderator</span>
								<span className="tag is-light">User</span>
							</div>
						</CoolBox>
					</Tile>
				</Tile>
				<Tile isParent isVertical>
					<Tile isChild className="content">
						<CoolBox title="Bio" className={styles.bio}>
							<ProfileInfo user={user} isAuth={isAuth} />
						</CoolBox>
					</Tile>
				</Tile>
			</Tile>
			<CoolBox title={`__${user?.username}'s maps~`} className={styles.maps}>
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
			</CoolBox>
		</Layout>
	);
};
