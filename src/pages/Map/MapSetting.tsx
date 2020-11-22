import React from "react";
import { Route } from "react-router-dom";

import { Layout, NavPanel, CoolBox } from "../../common";
import { Section } from "../../common/NavPanel/NavPanel";

import styles from "./MapSetting.module.css";
import { MapParams } from "./Map";

export const SettingRoutes = () => (
	<>
		<Route
			exact
			path="/maps/:mapID/setting/"
			component={() => <CoolBox title="info"></CoolBox>}
		/>
	</>
);

const getNavLinks = ({ mapID }: MapParams): Section[] => [
	{
		name: "info",
		to: `/maps/${mapID}/setting/`,
		exact: true,
		icon: "fas fa-info",
	},
];

export const MapSetting: React.FC<MapParams> = ({ mapID }) => (
	<Layout className={styles.setting}>
		<div className="columns">
			<div className="column is-one-fifth">
				<NavPanel heading="Setting" items={getNavLinks({ mapID })} />
			</div>
			<div className="column">
				<SettingRoutes />
			</div>
		</div>
	</Layout>
);
