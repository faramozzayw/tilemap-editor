import React from "react";
import classnames from "classnames";

import styles from "./CoolBox.module.css";

export interface CoolBox
	extends Omit<React.HTMLAttributes<HTMLFieldSetElement>, "title"> {
	title?: string | JSX.Element;
}

export const CoolBox: React.FC<CoolBox> = ({ title, children, ...props }) => {
	return (
		<fieldset className={classnames(styles.coolbox, props.className)}>
			{title ? (
				<legend className="has-background-grey-darker">{title}</legend>
			) : null}
			{children}
		</fieldset>
	);
};
