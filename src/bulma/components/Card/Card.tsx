import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";

export interface Card<T> extends Bulma.Tag, React.HTMLProps<T> {}

export const Card: React.FC<Card<HTMLElement>> = ({
	tag = "div",
	...props
}) => {
	const className = classnames("card", props.className);

	return React.createElement(tag, { ...props, className });
};
