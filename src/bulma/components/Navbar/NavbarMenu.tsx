import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";
import { getActiveModifiers } from "../../utils";

export interface NavbarMenu<T>
	extends Bulma.Tag,
		Bulma.Active,
		React.HTMLProps<T> {}

export const NavbarMenu: React.FC<NavbarMenu<HTMLElement>> = ({
	tag = "div",
	isActive,
	...props
}) => {
	const className = classnames(
		"navbar-menu",
		{
			...getActiveModifiers({ isActive }),
		},
		props.className,
	);

	return React.createElement(tag, { ...props, className });
};
