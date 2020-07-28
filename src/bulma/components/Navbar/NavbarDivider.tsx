import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";

export interface NavbarDivider<T> extends Bulma.Tag, React.HTMLProps<T> {}

export const NavbarDivider: React.FC<NavbarDivider<HTMLElement>> = ({
	tag = "hr",
	...props
}) => {
	const className = classnames("navbar-divider", props.className);

	return React.createElement(tag, { ...props, className });
};
