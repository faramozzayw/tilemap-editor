import React, { forwardRef, useState } from "react";
import classnames from "classnames";
import { Field, Label, Help, Control, Input } from "@faramo.zayw/reabulma";

import styles from "./InputField.module.css";

export interface PasswordInput<T> extends React.HTMLProps<T> {
	description?: string;
	hepler?: string;
}

export const PasswordInput = forwardRef<
	HTMLInputElement,
	PasswordInput<HTMLInputElement>
>(({ description, hepler, ...props }, ref) => {
	const [show, setShow] = useState(false);

	const icon = show ? "far fa-eye-slash" : "far fa-eye";
	const label = show ? "hide password" : "show password";

	const toggle = () => setShow((prev) => !prev);

	return (
		<Field>
			<Label className={classnames(styles.label, styles.labelWithHelp)}>
				{description}
				{hepler ? <Help isColor="warning">{hepler}</Help> : null}
			</Label>
			<Control>
				<Input
					{...props}
					type={show ? "text" : "password"}
					className={classnames("input", styles.input, props.className)}
					ref={ref}
				/>
				<button
					className={classnames("icon", styles.passwordToggle)}
					onClick={toggle}
					aria-label={label}
					type="button"
				>
					<i className={icon}></i>
				</button>
			</Control>
		</Field>
	);
});
