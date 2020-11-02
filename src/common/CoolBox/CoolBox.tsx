import React from "react";
import classnames from "classnames";

import styles from "./CoolBox.module.css";

export interface CoolBox extends React.HTMLAttributes<HTMLFieldSetElement> {
	title?: string;
}

export const CoolBox: React.FC<CoolBox> = ({ title, children, ...props }) => {
	return (
		<fieldset className={classnames(styles.coolbox, props.className)}>
			{title ? <legend>{title}</legend> : null}
			{children}
		</fieldset>
	);
};
