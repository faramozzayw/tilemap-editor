import React from "react";
import classnames from "classnames";

import { Bulma } from "./../../bulma";
import {
	getColorModifiers,
	getSizeModifiers,
	getStateModifiers,
	getLoadingModifiers,
} from "./../../utils";

export interface ButtonProps<T>
	extends Bulma.Color,
		Bulma.Loading,
		Bulma.Size,
		Bulma.Light,
		Bulma.Rounded,
		Bulma.State,
		Bulma.FullWidth,
		React.HTMLProps<T> {
	isLink?: boolean;
	isOutlined?: boolean;
	isInverted?: boolean;
	isStatic?: boolean;
	type?: "button" | "submit" | "reset";
}

export type ButtonType = React.FC<
	ButtonProps<HTMLButtonElement | HTMLAnchorElement>
>;

export const Button: ButtonType = ({
	isLink,
	isOutlined,
	isInverted,
	isStatic,
	isColor,
	isSize,
	isLight,
	isRounded,
	isLoading,
	isState,
	isFullWidth,
	type,
	...props
}) => {
	const className = classnames(
		"button",
		{
			"is-inverted": isInverted,
			"is-link": isLink,
			"is-outlined": isOutlined,
			"is-static": isStatic,
			"is-light": isLight,
			"is-rounded": isRounded,
			"is-fullwidth": isFullWidth,
			...getColorModifiers({ isColor }),
			...getSizeModifiers({ isSize }),
			...getStateModifiers({ isState }),
			...getLoadingModifiers({ isLoading }),
		},
		props.className,
	);

	const anchor = (
		// eslint-disable-next-line jsx-a11y/anchor-has-content
		<a
			{...(props as React.HTMLProps<HTMLAnchorElement>)}
			role="button"
			className={className}
			href={props?.href}
		/>
	);

	const button = (
		<button
			{...(props as React.HTMLProps<HTMLButtonElement>)}
			type={type ?? "button"}
			className={className}
		/>
	);

	return props.href ? anchor : button;
};
