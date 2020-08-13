import React from "react";
import { Content } from "../../bulma";
import { MapSize } from "../../types";

export interface PreviewCardInfoProps {
	description?: string;
	size: MapSize;
	createData: Date;
	lastEdit?: Date;
}

export interface KeyProps {
	children: React.ReactChild;
}

export const Key: React.FC<KeyProps> = ({ children }) => (
	<span className="key has-text-primary has-text-weight-bold">{children}</span>
);

export const PreviewCardInfo: React.FC<PreviewCardInfoProps> = ({
	description,
	size,
	createData,
	lastEdit,
}) => {
	return (
		<Content>
			{description && (
				<>
					<div className="description is-family-code">{description}</div>
					<br />
				</>
			)}
			<div className="config">
				<Key>Map size:</Key> {size.row} x {size.column}
				<br />
				<Key>Create:</Key>{" "}
				<time dateTime="2016-1-1">{createData /* toLocaleDateString() */}</time>
				<br />
				<Key>Last edit:</Key>{" "}
				<time dateTime="2016-1-1">
					{lastEdit?.toLocaleString() ?? "not edited yet"}
				</time>
			</div>
		</Content>
	);
};
