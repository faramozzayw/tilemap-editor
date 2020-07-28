import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";

export interface NavbarStart<T> extends Bulma.Tag, React.HTMLProps<T> {}

export const NavbarStart: React.FC<NavbarStart<HTMLElement>> = ({
	tag = "div",
	...props
}) => {
	const className = classnames("navbar-start", props.className);

	return React.createElement(tag, { ...props, className });
};
