import React from "react";
import { User } from "../../types";

import ProfilePicStyle from "./ProfilePic.module.css";

export interface ProfilePic extends Pick<User, "image"> {}

export const ProfilePic: React.FC<ProfilePic> = ({ image }) => {
	return (
		<figure className="image is-128x128">
			<img src={image} className={ProfilePicStyle.Image} alt="Profile pic" />
		</figure>
	);
};
