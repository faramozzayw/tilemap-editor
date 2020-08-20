import React from "react";

import ProfilePicStyle from "./ProfilePic.module.css";
import { Title } from "../../bulma";

export interface ProfileTitle {
	children: React.ReactChild;
}

/**
 * Displays a title on the profile page, but also can be used anywhere
 */
export const ProfileTitle: React.FC<ProfileTitle> = ({ children }) => (
	<Title
		className={`has-text-link-dark ${ProfilePicStyle.Title}`}
		isSize="4"
		tag="h4"
	>
		{children}
	</Title>
);
