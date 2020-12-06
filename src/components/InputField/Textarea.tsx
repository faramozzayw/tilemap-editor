import React, { forwardRef } from "react";
import classnames from "classnames";
import { Field, Label, Help, Control, TextArea } from "@faramo.zayw/reabulma";

import styles from "./InputField.module.css";

export interface Textarea<T> extends React.HTMLProps<T> {
	description?: string;
	hepler?: string;
}

export const Textarea = forwardRef<
	HTMLTextAreaElement,
	Textarea<HTMLTextAreaElement>
>(({ children, description, hepler, ...props }, ref) => {
	return (
		<Field>
			<Label className={classnames(styles.label, styles.labelWithHelp)}>
				{description}
				{hepler ? <Help isColor="warning">{hepler}</Help> : null}
			</Label>
			<Control>
				<TextArea
					{...props}
					className={classnames("scrollbar", styles.input, props.className)}
					ref={ref}
				/>
			</Control>
		</Field>
	);
});
