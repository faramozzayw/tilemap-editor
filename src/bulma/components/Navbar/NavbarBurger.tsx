import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";
import { getActiveModifiers } from "../../utils";

export interface NavbarBurger<T>
	extends Bulma.Tag,
		Bulma.Active,
		React.HTMLProps<T> {}

export const NavbarBurger: React.FC<NavbarBurger<HTMLElement>> = ({
	tag = "div",
	isActive,
	...props
}) => {
	const className = classnames(
		"navbar-burger",
		{
			...getActiveModifiers({ isActive }),
		},
		props.className,
	);

	return React.createElement(
		tag,
		{ ...props, className },
		React.createElement("span", { "aria-hidden": true }),
		React.createElement("span", { "aria-hidden": true }),
		React.createElement("span", { "aria-hidden": true }),
	);
};
