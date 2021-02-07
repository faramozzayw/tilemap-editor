import React from "react";

import Styles from "./MapName.module.css";
import { Link, LinkProps } from "react-router-dom";

export interface MapName extends Partial<LinkProps> {
	name: string;
}

export const MapName: React.FC<MapName> = ({ name, to, ...props }) =>
	to ? (
		<Link to={to} className={Styles.MapName} {...props}>
			{name}
		</Link>
	) : (
		<span className={Styles.MapName} {...props}>
			{name}
		</span>
	);
