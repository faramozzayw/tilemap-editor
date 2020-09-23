import React from "react";
import classnames from "classnames";

import { Bulma } from "./../bulma";
import { getColorModifiers } from "../utils";

export interface Help<T> extends Bulma.Color, Bulma.Tag, React.HTMLProps<T> {}

export const Help = ({ tag = "div", isColor, ...props }: Help<HTMLElement>) => {
	const className = classnames(
		"help",
		{
			...getColorModifiers({ isColor }),
		},
		props.className,
	);

	return React.createElement(tag, { ...props, className });
};
