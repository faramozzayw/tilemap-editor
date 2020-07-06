import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";

export interface HeroBody<T> extends Bulma.Tag, React.HTMLProps<T> {}

export const HeroBody: React.FC<HeroBody<HTMLElement>> = ({
	tag = "div",
	...props
}) => {
	const className = classnames("hero-body", props.className);

	return React.createElement(tag, { ...props, className });
};
