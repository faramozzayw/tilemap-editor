import React from "react";
import classnames from "classnames";

import { Bulma } from "./../bulma";
import { getColorModifiers, getSizeModifiers } from "../utils";

export interface ProgressBar<T>
	extends Bulma.Size,
		Bulma.Color,
		React.HTMLProps<T> {
	children?: React.ReactChild;
	indeterminate?: boolean;
}

export const ProgressBar: React.FC<ProgressBar<HTMLProgressElement>> = ({
	max,
	children,
	value,
	isSize,
	isColor,
	indeterminate,
	...props
}) => {
	const classNames = classnames(
		"progress",
		{
			...getColorModifiers({ isColor }),
			...getSizeModifiers({ isSize }),
		},
		props.className,
	);

	if (indeterminate) {
		return (
			<progress className={classNames} max={max} {...props}>
				{children}
			</progress>
		);
	}

	return (
		<progress className={classNames} value={value} max={max} {...props}>
			{children ?? value}
		</progress>
	);
};
