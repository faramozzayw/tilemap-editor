import React, { forwardRef } from "react";

import InputFieldStyle from "./InputField.module.css";

export interface InputField<T> extends React.HTMLProps<T> {
	value?: string | number | readonly string[];
	description?: string;
	children?: React.ReactChild;
}

export const InputField = forwardRef<
	HTMLInputElement,
	InputField<HTMLInputElement>
>(({ value, children, description, ...props }, ref) => {
	return (
		<label className={InputFieldStyle.Label}>
			{children}
			{description && (
				<small className={`is-family-monospace ${InputFieldStyle.Description}`}>
					{description}
				</small>
			)}
			<input
				{...props}
				ref={ref}
				type="text"
				className={InputFieldStyle.Input}
			/>
		</label>
	);
});
