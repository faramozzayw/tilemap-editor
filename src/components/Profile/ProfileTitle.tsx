import React from "react";
import classnames from "classnames";

import ProfilePicStyle from "./ProfilePic.module.css";
import { Title } from "../../bulma";

export interface ProfileTitle<T> extends React.HTMLProps<T> {
	children: React.ReactChild;
}

/**
 * Displays a title on the profile page, but also can be used anywhere
 */
export const ProfileTitle: React.FC<ProfileTitle<HTMLTitleElement>> = ({
	children,
	...props
}) => {
	const classNames = classnames(
		ProfilePicStyle.Title,
		"has-text-link-dark",
		props.className,
	);

	return (
		<Title className={classNames} {...props} isSize="4" tag="h4">
			{children}
		</Title>
	);
};
