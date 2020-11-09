import React from "react";
import { PanelIcon, Panel, PanelHeading } from "@faramo.zayw/reabulma";
import { NavLink } from "react-router-dom";

const basePath = "/me/setting";

export const SettingPanel = () => {
	return (
		<Panel isColor="info">
			<PanelHeading>Setting</PanelHeading>
			<NavLink
				className="panel-block"
				to={`${basePath}/`}
				exact
				activeClassName="is-active"
			>
				<PanelIcon icon="fas fa-info" />
				info
			</NavLink>
			<NavLink
				className="panel-block"
				to={`${basePath}/integrations/`}
				activeClassName="is-active"
			>
				<PanelIcon icon="fab fa-google" />
				integrations
			</NavLink>
			<NavLink
				className="panel-block"
				to={`${basePath}/privacy/`}
				activeClassName="is-active"
			>
				<PanelIcon icon="fas fa-user-secret" />
				privacy
			</NavLink>
		</Panel>
	);
};
