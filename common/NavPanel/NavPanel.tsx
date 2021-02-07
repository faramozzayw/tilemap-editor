import React from "react";
import classnames from "classnames";
import { Panel, PanelHeading, PanelIcon } from "@faramo.zayw/reabulma";
import { NavLink, NavLinkProps } from "react-router-dom";

import styles from "./NavPanel.module.css";

export interface Section extends Omit<NavLinkProps, "activeClassName"> {
	name: string;
	icon?: string | JSX.Element;
	classNames?: string;
}

export interface NavPanelProps<T = HTMLElement> extends React.HTMLProps<T> {
	heading: string;
	items: Section[];
}

export const NavPanel: React.FC<NavPanelProps> = ({
	heading,
	items,
	...props
}) => (
	<Panel isColor="info" className={styles.panel} {...props}>
		<PanelHeading>{heading}</PanelHeading>
		{items.map(({ name, icon, ...props }) => (
			<NavLink
				{...props}
				className={classnames("panel-block", props.classNames)}
				activeClassName="is-active"
			>
				{typeof icon == "string" ? <PanelIcon icon={icon} /> : icon}
				{name}
			</NavLink>
		))}
	</Panel>
);
