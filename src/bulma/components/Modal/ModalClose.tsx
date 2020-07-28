import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";

import { getSizeModifiers } from "./../../utils";

export interface ModalClose<T>
	extends Bulma.Size,
		Bulma.Tag,
		React.HTMLProps<T> {}

export function ModalClose({
	tag = "button",
	isSize,
	...props
}: ModalClose<HTMLElement>) {
	const className = classnames(
		"modal-close",
		{
			...getSizeModifiers({ isSize }),
		},
		props.className,
	);

	return React.createElement(tag, { ...props, className });
}
