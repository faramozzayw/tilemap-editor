import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";

export interface ModalBackground<T> extends Bulma.Tag, React.HTMLProps<T> {
	children?: React.ReactChild;
}

export const ModalBackground: React.FC<ModalBackground<HTMLElement>> = ({
	tag = "div",
	children,
	...props
}) => {
	const className = classnames("modal-background", props.className);

	return React.createElement(tag, { ...props, className });
};
