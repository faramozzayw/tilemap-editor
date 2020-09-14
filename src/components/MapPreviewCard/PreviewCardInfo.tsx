import React from "react";
import { Content } from "../../bulma";
import { MarkdownRemark } from "../../common";
import { Map } from "../../types/graphql";

export interface PreviewCardInfoProps
	extends Pick<Map, "description" | "size" | "createdAt" | "updatedAt"> {}

export const Key: React.FC = ({ children }) => (
	<span className="key has-text-primary has-text-weight-bold">{children}</span>
);

export const PreviewCardInfo: React.FC<PreviewCardInfoProps> = ({
	description,
	size,
	createdAt,
	updatedAt,
}) => (
	<Content>
		{description && <MarkdownRemark markdown={description} />}
		<div className="config">
			<Key>Map size:</Key> {size.row} x {size.column}
			<br />
			<Key>Create:</Key>{" "}
			<time dateTime="2016-1-1">
				{new Date(createdAt).toLocaleDateString()}
			</time>
			<br />
			<Key>Last edit:</Key>{" "}
			<time dateTime="2016-1-1">
				{updatedAt ? new Date(updatedAt).toLocaleString() : "not edited yet"}
			</time>
		</div>
	</Content>
);
