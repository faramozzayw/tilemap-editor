import React from "react";
import { MarkdownRemark } from "../../common";
import { User } from "../../types";

interface ProfileDescription extends Pick<User, "description"> {}

export const ProfileDescription: React.FC<ProfileDescription> = ({
	description,
}) => {
	if (!description) return null;

	return (
		<>
			<MarkdownRemark markdown={description} />
		</>
	);
};
