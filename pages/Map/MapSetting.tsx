import React from "react";
import { Route } from "react-router-dom";
import classnames from "classnames";

import { NavPanel, CoolBox } from "../../common";
import { Section } from "../../common/NavPanel/NavPanel";

import styles from "./MapSetting.module.css";
import { Map } from "../../types/graphql";
import { InfoSetting } from "./InfoSetting";
import { DeleteMap } from "./DeleteMap";
import { Tile } from "@faramo.zayw/reabulma";

export interface MapSettingProps extends Pick<Map, "id"> {}

const BasicSetting = () => (
	<Tile isAncestor>
		<Tile isParent isVertical>
			<Tile isChild>
				<InfoSetting />
			</Tile>
			<Tile isChild>
				<DeleteMap />
			</Tile>
		</Tile>
	</Tile>
);

export const SettingRoutes = () => (
	<>
		<Route exact path="/maps/:mapID/setting" component={BasicSetting} />
		<Route
			exact
			path="/maps/:mapID/setting/test/"
			component={() => <CoolBox title="Test">Test</CoolBox>}
		/>
	</>
);

const getNavLinks = ({ id }: MapSettingProps): Section[] => [
	{
		name: "info",
		to: `/maps/${id}/setting/`,
		exact: true,
		icon: "fas fa-info",
	},
	{
		name: "test",
		to: `/maps/${id}/setting/test/`,
		exact: true,
		icon: "fas fa-info",
	},
];

export const MapSetting: React.FC<MapSettingProps> = ({ id }) => (
	<div className={classnames("columns", styles.columns, styles.setting)}>
		<div className="column is-one-fifth">
			<NavPanel heading="Setting" items={getNavLinks({ id })} />
		</div>
		<div className="column">
			<SettingRoutes />
		</div>
	</div>
);
