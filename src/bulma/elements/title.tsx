import React from "react";
import classnames from "classnames";

import { Bulma } from "./../bulma";
import { getHeadingModifiers } from "../utils";

export interface Title<T>
	extends Bulma.Tag,
		Bulma.Heading,
		React.HTMLProps<T> {}

export const Title = ({
	tag = "h1",
	isSize,
	isSpaced,
	...props
}: Title<HTMLElement>) => {
	const className = classnames(
		"title",
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
