import React from "react";
import { Layout } from "../../../common";

import styles from "./Setting.module.css";
import { SettingPanel } from "./SettingPanel";
import { Route } from "react-router-dom";
import { SettingIntegrations, SettingPrivacy, SettingInfo } from "./index";

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
