import React from "react";
import classnames from "classnames";

import { Bulma } from "./../bulma";
import {
	getColorModifiers,
	getSizeModifiers,
	getStateModifiers,
} from "../utils";

export interface TextArea<T>
	extends Bulma.Color,
		Bulma.Size,
		Bulma.State,
		React.HTMLProps<T> {}

export const TextArea: React.FC<TextArea<HTMLElement>> = ({
	isSize,
	isState,
	isColor,
	...props
}) => {
	const className = classnames(
		"textarea",
		{
			...getColorModifiers({ isColor }),
			...getSizeModifiers({ isSize }),
			...getStateModifiers({ isState }),
		},
		props.className,
	);

	return (
		<textarea
			{...(props as React.HTMLProps<HTMLTextAreaElement>)}
			className={className}
		/>
	);
};
