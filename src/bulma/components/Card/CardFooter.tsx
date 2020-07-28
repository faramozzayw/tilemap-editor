import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";

export interface CardFooter<T> extends Bulma.Tag, React.HTMLProps<T> {}

export const CardFooter: React.FC<CardFooter<HTMLElement>> = ({
	tag = "footer",
	...props
}) => {
	const className = classnames("card-footer", props.className);

	return React.createElement(tag, { ...props, className });
};
