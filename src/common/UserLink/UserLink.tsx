import React from "react";
import { User } from "../../types";
import { Link } from "react-router-dom";

import Styles from "./UserLink.module.css";

export interface UserLink {
	username?: User["username"];
}

export const UserLink: React.FC<UserLink> = ({ username }) => {
	if (!username) return null;

	const title = `@${username}`;
	const userURL = `/${title}`;

	return (
		<Link className={Styles.UserLink} to={userURL}>
			{title}
		</Link>
	);
};
