import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";
import { getColorModifiers } from "./../../utils";

export interface Panel<T> extends Bulma.Tag, Bulma.Color, React.HTMLProps<T> {}

export const Panel: React.FC<Panel<HTMLElement>> = ({
	tag = "nav",
	isColor,
	...props
}) => {
	const className = classnames(
		"panel",
		{
			...getColorModifiers({ isColor }),
		},
		props.className,
	);

	return React.createElement(tag, { ...props, className });
};
