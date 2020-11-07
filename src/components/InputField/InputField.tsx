import React, { forwardRef } from "react";
import classnames from "classnames";
import { Field, Label, Help, Control, Input } from "@faramo.zayw/reabulma";

import styles from "./InputField.module.css";

export interface InputField<T> extends React.HTMLProps<T> {
	description?: string;
	hepler?: string;
}

export const InputField = forwardRef<
	HTMLInputElement,
	InputField<HTMLInputElement>
>(({ children, description, hepler, ...props }, ref) => {
	return (
		<Field>
			<Label className={classnames(styles.label, styles.labelWithHelp)}>
				{description}
				{hepler ? <Help isColor="warning">{hepler}</Help> : null}
			</Label>
			<Control>
				<Input
					{...props}
					className={classnames("input", styles.input, props.className)}
					ref={ref}
				/>
			</Control>
		</Field>
	);
});
