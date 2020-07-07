import React from "react";
import classnames from "classnames";

import { Bulma } from "./../bulma";

export interface Control<T>
	extends Bulma.Loading,
		Bulma.Tag,
		React.HTMLProps<T> {
	isExpanded?: boolean;
}

export const Control = ({ tag = "div", ...props }: Control<HTMLElement>) => {
	const className = classnames(
		"control",
		{
			"is-expanded": props.isExpanded,
		},
		props.className,
	);

	return React.createElement(tag, { ...props, className });
};
