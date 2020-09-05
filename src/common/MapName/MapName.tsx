import React from "react";

import Styles from "./MapName.module.css";

export interface MapName {
	name: string;
}

export const MapName: React.FC<MapName> = ({ name }) => (
	<span className={Styles.MapName}>{name}</span>
);
