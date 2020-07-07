import React from "react";
import classnames from "classnames";

import { Bulma } from "./../bulma";
import { getSizeModifiers } from "./../utils";

export interface Label<T> extends Bulma.Size, React.HTMLProps<T> {}

export const Label: React.FC<Label<HTMLElement>> = ({ isSize, ...props }) => {
	const className = classnames(
		"label",
		{
			...getSizeModifiers({ isSize }),
		},
		props.className,
	);

	return (
		<label
			{...(props as React.Props<HTMLLabelElement>)}
			className={className}
		/>
	);
};
