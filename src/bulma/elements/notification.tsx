import React from "react";
import classnames from "classnames";

import { Bulma } from "../bulma";
import { getColorModifiers } from "../utils";

export interface Notification<T>
	extends Bulma.Tag,
		Bulma.Color,
		Bulma.Light,
		React.HTMLProps<T> {}

export const Notification: React.FC<Notification<HTMLElement>> = ({
	tag = "div",
	isColor,
	isLight,
	...props
}) => {
	const className = classnames(
		"notification",
		{
			"is-light": isLight,
			...getColorModifiers({ isColor }),
		},
		props.className,
	);

	return React.createElement(tag, { ...props, className });
};
