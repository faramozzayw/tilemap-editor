import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";

export interface PanelHeading<T> extends Bulma.Tag, React.HTMLProps<T> {}

export const PanelHeading: React.FC<PanelHeading<HTMLElement>> = ({
	tag = "p",
	...props
}) => {
	const className = classnames("panel-heading", props.className);

	return React.createElement(tag, { ...props, className });
};
