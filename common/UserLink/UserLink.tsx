import React from "react";
import { Link } from "react-router-dom";

import Styles from "./UserLink.module.css";
import { Author } from "../../types/graphql";

export const UserLink: React.FC<Partial<Author>> = ({ username }) => {
	if (!username) return null;

	const title = `@${username}`;
	const userURL = `/${title}`;

	return (
		<Link className={Styles.UserLink} to={userURL}>
			{title}
		</Link>
	);
};
