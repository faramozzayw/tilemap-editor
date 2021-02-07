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
	useMapsPaginationQuery,
} from "../types/graphql";
import styles from "./Profile.module.css";

export interface ProfilePageParams {
	username: string;
}

export const ProfilePage = () => {
	const { username } = useParams<ProfilePageParams>();
	const { isAuthenticated: isAuth } = useAuthState();

	const { error: errorUser, data: userData } = useGetUserByUsernameQuery({
		variables: { username },
		onError: console.error,
		fetchPolicy: "cache-and-network",
	});

	const {
		loading: loadingMaps,
		error: errorMaps,
		data,
		fetchMore,
	} = useMapsPaginationQuery({
		variables: {
			filter: {
				author: username,
			},
			first: 5,
		},
		onError: console.error,
		fetchPolicy: "cache-and-network",
	});

	const nodes = data?.mapsPagination?.edges?.map((edge) => edge.node);
	const user = userData?.getUserByUsername;

	if (errorUser) {
		return (
			<Layout>
				<div>Error!</div>
			</Layout>
		);
	}

	if (!user) {
		return (
			<Layout>
				<ProgressBar isColor="info" isSize="small" max="100" />
			</Layout>
		);
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
							<ProfilePic image={user?.imageUrl ?? undefined} />
							<MarkdownRemark markdown={user.description} />
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
					loading={loadingMaps}
					error={errorMaps}
					isAuth={isAuth}
					maps={nodes}
					onLoadMore={() => {
						fetchMore({
							variables: {
								after: data?.mapsPagination.pageInfo?.endCursor,
							},
						});
					}}
				/>
			</CoolBox>
		</Layout>
	);
};
