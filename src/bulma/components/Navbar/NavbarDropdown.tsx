import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";

export interface NavbarDropdown<T> extends Bulma.Tag, React.HTMLProps<T> {
	isBoxed?: boolean;
}

export const NavbarDropdown: React.FC<NavbarDropdown<HTMLElement>> = ({
	tag = "div",
	isBoxed,
	...props
}) => {
	const className = classnames(
		"navbar-dropdown",
		{
			"is-boxed": isBoxed,
		},
		props.className,
	);

	return React.createElement(tag, {
		...props,
		className,
	});
};
