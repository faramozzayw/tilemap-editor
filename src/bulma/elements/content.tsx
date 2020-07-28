import React from "react";
import classnames from "classnames";

import { Bulma } from "./../bulma";
import { getSizeModifiers } from "../utils";

export interface Content<T> extends Bulma.Size, Bulma.Tag, React.HTMLProps<T> {}

export const Content: React.FC<Content<HTMLElement>> = ({
	tag = "div",
	isSize,
	...props
}) => {
	const className = classnames(
		"content",
		{
			...getSizeModifiers({ isSize }),
		},
		props.className,
	);

	return React.createElement(tag, { ...props, className });
};
