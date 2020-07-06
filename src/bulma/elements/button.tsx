import React from "react";
import classnames from "classnames";

import { Bulma } from "./../bulma";
import { getColorModifiers, getSizeModifiers } from "./../utils";

export interface ButtonProps<T>
	extends Bulma.Color,
		Bulma.Loading,
		Bulma.Size,
		Bulma.Light,
		Bulma.Rounded,
		React.HTMLProps<T> {
	isLink?: boolean;
	isOutlined?: boolean;
	isInverted?: boolean;
	isStatic?: boolean;
	type?: string;
}

export const Button: React.FC<ButtonProps<
	HTMLButtonElement | HTMLAnchorElement
>> = ({
	isLink,
	isOutlined,
	isInverted,
	isStatic,
	isColor,
	isSize,
	isLight,
	isRounded,
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
			...getColorModifiers({ isColor }),
			...getSizeModifiers({ isSize }),
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
			// @ts-ignore
			type={type ?? "button"}
			className={className}
		/>
	);

	return props.href ? anchor : button;
};
