import React from "react";
import { useQuery } from "@apollo/client";

import { useAuthState } from "../hooks/auth";

import { Hero, HeroHeader, HeroBody, ProgressBar } from "../bulma";
import { MainNavbar, MapPreviewCard } from "../components";
import { ProfilePic, ProfileTitle, InputField } from "../components/Profile";

import ProfilePicStyle from "./../components/Profile/ProfilePic.module.css";
import { GET_MAPS_BY_USER } from "../graphql";
import { MapConfig } from "../types";

interface MapConfigData {
	maps: MapConfig[];
}

export const ProfilePage = () => {
	const { user, isAuthenticated: isAuth } = useAuthState();

	const { loading, error, data } = useQuery<MapConfigData>(GET_MAPS_BY_USER, {
		variables: {
			username: user?.username,
		},
	});

	let user_maps: React.ReactElement | null = null;

	if (loading)
		user_maps = <ProgressBar isColor="primary" isSize="small" max="100" />;
	if (error) user_maps = <p>Error :(</p>;
	if (data) {
		user_maps = (
			<div className="columns is-multiline is-left" style={{ flex: "1" }}>
				{data.maps?.map((mapData) => (
					<div className="column is-4" key={mapData.id}>
						<MapPreviewCard {...mapData} isAuth={isAuth} />
					</div>
				))}
			</div>
		);
	}

	return (
		<Hero isColor="dark" isFullHeight>
			<HeroHeader>
				<MainNavbar />
			</HeroHeader>
			<HeroBody style={{ display: "grid" }}>
				<section className="tile is-ancestor">
					<div className="tile is-3 is-vertical is-parent">
						<div className={`tile is-child content ${ProfilePicStyle.Box}`}>
							<ProfilePic image={user?.image} />
							<ProfileTitle>Status</ProfileTitle>
							<p>
								Lorem ipsum dolor <em>sit amet</em>, consectetur adipiscing
								elit. Proin{" "}
							</p>
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

							<InputField value={user?.username} description="+|__username__|+">
								<span className={`is-family-code ${ProfilePicStyle.Symbol}`}>
									@
								</span>
							</InputField>

							<InputField value={user?.email} description="~~email~~" />
						</div>
					</div>
				</section>
				<section className={ProfilePicStyle.Box}>
					<ProfileTitle>_Your maps~</ProfileTitle>
					{user_maps}
				</section>
			</HeroBody>
		</Hero>
	);
};
