import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";
import { getAlignmentModifiers, getSizeModifiers } from "./../../utils";

export interface Tabs<T>
	extends Bulma.Alignment,
		Bulma.Size,
		Bulma.Tag,
		React.HTMLProps<T> {
	isAlign?: "left" | "centered" | "right";
	isBoxed?: boolean;
	isToggle?: boolean;
}

export const Tabs: React.FC<Tabs<HTMLElement>> = ({
	tag = "li",
	isAlign,
	isSize,
	...props
}) => {
	const className = classnames(
		"tabs",
		{
			"is-boxed": props.isBoxed,
			"is-toggle": props.isToggle,
			...getAlignmentModifiers({ isAlign }),
			...getSizeModifiers({ isSize }),
		},
		props.className,
	);

	return React.createElement(tag, { ...props, className });
};
