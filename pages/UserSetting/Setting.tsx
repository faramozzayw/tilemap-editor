import React from "react";
import { Route } from "react-router-dom";

import { Layout, NavPanel } from "../../common";

import { SettingIntegrations, SettingPrivacy, SettingInfo } from "./index";

import styles from "./Setting.module.css";

export const SettingRoutes = () => (
	<>
		<Route exact path="/me/setting/" component={SettingInfo} />
		<Route
			exact
			path="/me/setting/integrations/"
			component={SettingIntegrations}
		/>
		<Route exact path="/me/setting/privacy/" component={SettingPrivacy} />
	</>
);

const navLinks = [
	{
		name: "info",
		to: "/me/setting/",
		exact: true,
		icon: "fas fa-info",
	},
	{
		name: "integrations",
		to: "/me/setting/integrations/",
		icon: "fab fa-google",
	},
	{
		name: "privacy",
		to: "/me/setting/privacy/",
		icon: "fas fa-user-secret",
	},
];

export const Setting = () => {
	return (
		<Layout className={styles.setting}>
			<div className="columns">
				<div className="column is-one-fifth">
					<NavPanel heading="Setting" items={navLinks} />
				</div>
				<div className="column">
					<SettingRoutes />
				</div>
			</div>
		</Layout>
	);
};
