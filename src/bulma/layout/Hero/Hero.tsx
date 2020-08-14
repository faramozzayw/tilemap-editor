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
	isBold,
	isFullHeight,
	isHalfHeight,
	...props
}) => {
	const className = classnames(
		"hero",
		{
			"is-bold": isBold,
			"is-fullheight": isFullHeight,
			"is-halfheight": isHalfHeight,
			...getColorModifiers({ isColor }),
			...getSizeModifiers({ isSize }),
		},
		props.className,
	);

	return React.createElement(tag, { ...props, className });
};
