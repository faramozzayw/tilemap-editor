import React from "react";
import { Route } from "react-router-dom";

import { Layout } from "../../common";

import { SettingPanel } from "./SettingPanel";
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

export const Setting = () => {
	return (
		<Layout className={styles.setting}>
			<div className="columns">
				<div className="column is-one-fifth">
					<SettingPanel />
				</div>
				<div className="column">
					<SettingRoutes />
				</div>
			</div>
		</Layout>
	);
};
