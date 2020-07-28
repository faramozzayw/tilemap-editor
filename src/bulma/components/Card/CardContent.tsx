import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";

export interface CardContent<T> extends Bulma.Tag, React.HTMLProps<T> {}

export const CardContent: React.FC<CardContent<HTMLElement>> = ({
	tag = "div",
	...props
}) => {
	const className = classnames("card-content", props.className);

	return React.createElement(tag, { ...props, className });
};
