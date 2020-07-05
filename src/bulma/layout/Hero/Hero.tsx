import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";
import { getColorModifiers, getSizeModifiers } from "./../../utils";

export interface Hero<T>
	extends Bulma.Size,
		Bulma.Tag,
		Bulma.Color,
		React.HTMLProps<T> {
	isBold?: boolean;
	isFullHeight?: boolean;
	isHalfHeight?: boolean;
}

export const Hero: React.FC<Hero<HTMLElement>> = ({
	tag = "section",
	isColor,
	isSize,
	...props
}) => {
	const className = classnames(
		"hero",
		{
			"is-bold": props.isBold,
			"is-fullheight": props.isFullHeight,
			"is-halfheight": props.isHalfHeight,
			...getColorModifiers({ isColor }),
			...getSizeModifiers({ isSize }),
		},
		props.className,
	);

	return React.createElement(tag, { ...props, className });
};
