import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";

export interface ModalContent<T> extends Bulma.Tag, React.HTMLProps<T> {}

export const ModalContent: React.FC<ModalContent<HTMLElement>> = ({
	tag = "div",
	...props
}) => {
	const className = classnames("modal-content", props.className);

	return React.createElement(tag, { ...props, className });
};
