import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";
import { getActiveModifiers } from "./../../utils";

export interface NavbarItem<T>
	extends Bulma.Tag,
		Bulma.Active,
		React.HTMLProps<T> {
	isHoverable?: boolean;
	hasDropdown?: boolean;
	dropdownUp?: boolean;
}

export const NavbarItem: React.FC<NavbarItem<HTMLElement>> = ({
	tag = "div",
	isHoverable,
	hasDropdown,
	dropdownUp,
	isActive,
	...props
}) => {
	const className = classnames(
		"navbar-item",
		{
			"has-dropdown": hasDropdown,
			"is-hoverable": isHoverable,
			"has-dropdown-up": hasDropdown && dropdownUp,
			...getActiveModifiers({ isActive }),
		},
		props.className,
	);

	const htmlTag = props.href ? "a" : tag;

	return React.createElement(htmlTag, {
		...props,
		className,
	});
};
