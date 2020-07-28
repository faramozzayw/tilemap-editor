import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";
import { getActiveModifiers } from "../../utils";

export interface NavbarLink<T>
	extends Bulma.Tag,
		Bulma.Active,
		React.HTMLProps<T> {}

export const NavbarLink: React.FC<NavbarLink<HTMLElement>> = ({
	tag = "a",
	isActive,
	...props
}) => {
	const className = classnames(
		"navbar-link",
		{
			...getActiveModifiers({ isActive }),
		},
		props.className,
	);

	return React.createElement(tag, { ...props, className });
};
