import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";

export interface NavbarBrand<T> extends Bulma.Tag, React.HTMLProps<T> {}

export const NavbarBrand: React.FC<NavbarBrand<HTMLElement>> = ({
	tag = "div",
	...props
}) => {
	const className = classnames("navbar-brand", props.className);

	return React.createElement(tag, {
		...props,
		className,
	});
};
