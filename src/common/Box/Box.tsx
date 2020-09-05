import React from "react";

import Styles from "./Box.module.css";

export const Box: React.FC = ({ children }) => (
	<div className={Styles.Box}>{children}</div>
);
