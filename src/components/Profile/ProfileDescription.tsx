import React from "react";

export const ProfileDescription: React.FC = ({ children }) => {
	if (!children) return null;

	// to markdown
	return <p>{children}</p>;
};
