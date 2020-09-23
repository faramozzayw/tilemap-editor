import React from "react";
import { Content } from "../../bulma";
import { MarkdownRemark } from "../../common";
import { Map } from "../../types/graphql";

import Styles from "./MapFeed.module.css";

export interface MapConfig
	extends Pick<Map, "description" | "size" | "createdAt" | "updatedAt"> {}

export const Key: React.FC = ({ children }) => (
	<span className="key has-text-primary has-text-weight-bold">{children}</span>
);

export const MapConfig: React.FC<MapConfig> = ({
	description,
	size,
	createdAt,
	updatedAt,
}) => (
	<Content>
		{description && <MarkdownRemark markdown={description} />}
		<div className={Styles.Config}>
			<Key>Map size:</Key> {size.row} x {size.column}
			<br />
			<Key>Create:</Key>{" "}
			<time dateTime="2016-1-1">
				{new Date(createdAt).toLocaleDateString()}
			</time>
			<br />
			<Key>Last edit:</Key>{" "}
			<time dateTime="2016-1-1">
				{updatedAt
					? new Date(updatedAt).toLocaleDateString()
					: "not edited yet"}
			</time>
		</div>
	</Content>
);
