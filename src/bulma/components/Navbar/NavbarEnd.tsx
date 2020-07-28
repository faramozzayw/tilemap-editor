import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";

export interface NavbarEnd<T> extends Bulma.Tag, React.HTMLProps<T> {}

export const NavbarEnd: React.FC<NavbarEnd<HTMLElement>> = ({
	tag = "div",
	...props
}) => {
	const className = classnames("navbar-end", props.className);

	return React.createElement(tag, { ...props, className });
};
