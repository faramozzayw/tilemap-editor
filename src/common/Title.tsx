import React from "react";
import classnames from "classnames";

import Styles from "./Box.module.css";
import { Title as BulmaTitle } from "../bulma";

/**
 * Displays a title
 */
export const Title: React.FC<BulmaTitle<HTMLTitleElement>> = ({
	children,
	...props
}) => {
	if (!children) return null;

	const classNames = classnames(
		Styles.Title,
		"has-text-link-dark",
		props.className,
	);

	return (
		<BulmaTitle className={classNames} {...props} isSize="4" tag="h4">
			{children}
		</BulmaTitle>
	);
};
