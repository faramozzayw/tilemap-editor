import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";

export interface HeroHeader<T> extends Bulma.Tag, React.HTMLProps<T> {}

export const HeroHeader: React.FC<HeroHeader<HTMLElement>> = ({
	tag = "header",
	...props
}) => {
	const className = classnames("hero-head", props.className);

	return React.createElement(tag, { ...props, className });
};
