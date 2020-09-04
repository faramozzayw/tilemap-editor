import React from "react";
import { useParams } from "react-router-dom";

import { useAuthState } from "../hooks/auth";

import { Hero, HeroHeader, HeroBody } from "../bulma";
import { MainNavbar } from "../components";
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

	if (!userData) {
		return (
			<progress className="progress is-large is-info" max="100">
				Loading user data `{username}`
			</progress>
		);
	}

	const user = userData.getUserByUsername;

	return (
		<Hero isColor="dark" isFullHeight>
			<HeroHeader>
				<MainNavbar />
			</HeroHeader>
			<HeroBody style={{ display: "grid" }}>
				<section className="tile is-ancestor">
					<div className="tile is-3 is-vertical is-parent">
						<div className={`tile is-child content ${ProfilePicStyle.Box}`}>
							<ProfilePic />
							<ProfileTitle>Status</ProfileTitle>
							<ProfileDescription
								description={
									"`code` *italic* **bold** [link](https://localhost:300/)"
								}
							/>
						</div>
						<div className={`tile is-child content ${ProfilePicStyle.Box}`}>
							<ProfileTitle>Roles</ProfileTitle>
							<div className="tags">
								<span className="tag is-danger">Admin</span>
								<span className="tag is-link">Moderator</span>
								<span className="tag is-light">User</span>
							</div>
						</div>
					</div>
					<div className="tile is-parent">
						<div className={`tile is-child content ${ProfilePicStyle.Box}`}>
							<ProfileTitle>Bio</ProfileTitle>
							<ProfileInfo user={user} isAuth={isAuth} />
						</div>
					</div>
				</section>
				<section className={ProfilePicStyle.Box}>
					<ProfileTitle>_Your maps~</ProfileTitle>
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
			</HeroBody>
		</Hero>
	);
};
