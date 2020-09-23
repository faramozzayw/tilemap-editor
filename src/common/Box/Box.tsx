import React from "react";
import classnames from "classnames";

import Styles from "./Box.module.css";

export const Box: React.FC = ({ children }) => (
	<div className={classnames(Styles.Box)}>{children}</div>
);
