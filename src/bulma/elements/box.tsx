import React from "react";
import classnames from "classnames";

import { Bulma } from "./../bulma";

export interface Box<T> extends Bulma.Tag, React.HTMLProps<T> {}

export const Box = ({ tag = "div", ...props }: Box<HTMLElement>) => {
	const className = classnames("box", props.className);

	return React.createElement(tag, { ...props, className });
};
