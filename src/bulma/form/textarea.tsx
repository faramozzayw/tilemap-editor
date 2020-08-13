import React, { forwardRef } from "react";
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

export const TextArea = forwardRef<
	HTMLTextAreaElement,
	TextArea<HTMLTextAreaElement>
>(({ isSize, isState, isColor, ...props }, ref) => {
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
			ref={ref}
			{...(props as React.HTMLProps<HTMLTextAreaElement>)}
			className={className}
		/>
	);
});
