import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";
import { getActiveModifiers } from "../../utils";

export interface Modal<T> extends Bulma.Tag, Bulma.Active, React.HTMLProps<T> {}

export const Modal: React.FC<Modal<HTMLElement>> = ({
	tag = "div",
	isActive,
	...props
}) => {
	const className = classnames(
		"modal",
		{
			...getActiveModifiers({ isActive }),
		},
		props.className,
	);

	return React.createElement(tag, { ...props, className });
};
