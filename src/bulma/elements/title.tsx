import React from "react";
import classnames from "classnames";

import { Bulma } from "./../bulma";
import { getHeadingModifiers } from "../utils";

export interface Title<T> extends Bulma.Tag, Bulma.Heading, React.HTMLProps<T> {
	isSubtitle?: boolean;
}

export const Title: React.FC<Title<HTMLElement>> = ({
	tag = "h1",
	isSize,
	isSpaced,
	isSubtitle,
	...props
}) => {
	const titleType = isSubtitle ? "subtitle" : "title";

	const className = classnames(
		titleType,
		{
			...getHeadingModifiers({
				isSize,
				isSpaced,
			}),
		},
		props.className,
	);

	return React.createElement(tag, { ...props, className });
};
