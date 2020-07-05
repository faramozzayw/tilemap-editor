import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";

export interface HeroFooter<T> extends Bulma.Tag, React.HTMLProps<T> {}

export const HeroFooter: React.FC<HeroFooter<HTMLElement>> = ({
	tag = "footer",
	...props
}) => {
	const className = classnames("hero-foot", props.className);

	return React.createElement(tag, { ...props, className });
};
