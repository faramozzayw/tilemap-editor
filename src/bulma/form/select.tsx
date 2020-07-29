import React from "react";
import classnames from "classnames";

import { Bulma } from "./../bulma";
import {
	getColorModifiers,
	getSizeModifiers,
	getLoadingModifiers,
} from "../utils";

export interface Select<T>
	extends Bulma.Color,
		Bulma.Size,
		Bulma.Loading,
		Bulma.Rounded,
		React.HTMLProps<T> {}

export const Select: React.FC<Select<HTMLElement>> = ({
	isSize,
	disabled,
	isColor,
	isLoading,
	isRounded,
	children,
	...props
}) => {
	const wrapperClassname = classnames(
		"select",
		{
			"is-disabled": disabled,
			"is-rounded": isRounded,
			...getColorModifiers({ isColor }),
			...getSizeModifiers({ isSize }),
			...getLoadingModifiers({ isLoading }),
		},
		props.className,
	);

	return (
		<div className={wrapperClassname}>
			<select {...(props as React.Props<HTMLSelectElement>)}>{children}</select>
		</div>
	);
};
