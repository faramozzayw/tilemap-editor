import React from "react";
import { Hero, HeroHeader, HeroBody } from "../bulma";
import { MainNavbar } from "../components";
import { useAuthState } from "../hooks/auth";
import { ProfilePic } from "../components/Profile";

import ProfilePicStyle from "./../components/Profile/ProfilePic.module.css";
import { InputField } from "../components/Profile/InputField";

export const ProfilePage = () => {
	const { user } = useAuthState();

	return (
		<Hero isColor="dark" isFullHeight>
			<HeroHeader>
				<MainNavbar />
			</HeroHeader>
			<HeroBody style={{ alignItems: "initial" }}>
				<div className="tile is-ancestor">
					<div className="tile is-3 is-vertical is-parent">
						<div className="tile is-child notification is-dark">
							<ProfilePic image={user?.image} />
						</div>
						<div className={`tile is-child content ${ProfilePicStyle.Box}`}>
							<p
								className={`title has-text-link-dark ${ProfilePicStyle.Title}`}
							>
								Status
							</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin{" "}
							</p>
						</div>
					</div>
					<div className="tile is-parent">
						<div className={`tile is-child content ${ProfilePicStyle.Box}`}>
							<p
								className={`title has-text-link-dark ${ProfilePicStyle.Title}`}
							>
								Bio
							</p>

							<InputField value={user?.username} description="+|__username__|+">
								<span className={`is-family-code ${ProfilePicStyle.Symbol}`}>
									@
								</span>
							</InputField>

							<InputField value={user?.email} description="~~email~~" />

							<p>
								{" "}
								felis hendrerit sit amet. Aenean vitae gravida diam, finibus
								dignissim turpis.
							</p>
							<p> ligula, maximus et libero. Quisque non semper leo.</p>
						</div>
					</div>
				</div>
			</HeroBody>
		</Hero>
	);
};
