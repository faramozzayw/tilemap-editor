import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";

export interface CardFooterItem<T> extends Bulma.Tag, React.HTMLProps<T> {}

export const CardFooterItem: React.FC<CardFooterItem<HTMLElement>> = ({
	tag = "p",
	...props
}) => {
	const className = classnames("card-footer-item", props.className);

	return React.createElement(tag, { ...props, className });
};
