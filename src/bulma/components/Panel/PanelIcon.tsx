import React from "react";

export interface PanelIcon<T> extends React.HTMLProps<T> {
	icon: string;
}

export const PanelIcon: React.FC<PanelIcon<HTMLElement>> = ({
	children,
	icon,
	...props
}) => (
	<span {...props} className="panel-icon">
		<i className={`${icon}`} aria-hidden="true"></i>
	</span>
);
