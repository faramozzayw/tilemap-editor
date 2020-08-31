import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";
import { getColorModifiers } from "../../utils";

export interface Navbar<T> extends Bulma.Tag, Bulma.Color, React.HTMLProps<T> {
	isTransparent?: boolean;
	isFixedTop?: boolean;
	isFixedBottom?: boolean;
}

export const Navbar: React.FC<Navbar<HTMLElement>> = ({
	tag = "nav",
	isTransparent,
	isColor,
	isFixedTop,
	isFixedBottom,
	...props
}) => {
	const className = classnames(
		"navbar",
		{
			"is-transparent": isTransparent,
			"is-fixed-top": isFixedTop && !isFixedBottom,
			"is-fixed-bottom": isFixedBottom && !isFixedTop,
			...getColorModifiers({ isColor }),
		},
		props.className,
	);

	return React.createElement(tag, { ...props, className });
};
