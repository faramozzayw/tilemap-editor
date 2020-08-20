import React from "react";

import InputFieldStyle from "./InputField.module.css";

export interface InputField {
	value?: string | number | readonly string[];
	description?: string;
	children?: React.ReactChild;
	[key: string]: any;
}

export const InputField: React.FC<InputField> = ({
	value,
	children,
	description,
	onChange,
}) => {
	return (
		<label className={InputFieldStyle.Label}>
			{children}
			{description && (
				<small className={`is-family-monospace ${InputFieldStyle.Description}`}>
					{description}
				</small>
			)}
			<input
				type="text"
				className={InputFieldStyle.Input}
				value={value ?? "Honey, what's with your data?"}
			/>
		</label>
	);
};
