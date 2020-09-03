import React from "react";
import { useParams } from "react-router-dom";

import { ProgressBar, Title as BulmaTitle, Tile } from "../bulma";
import { useEditMapQuery } from "../types/graphql";
import { Layout, UserLink, MarkdownRemark, Box, Title } from "../common";
import { MapConfig } from "../types";
import { PreviewCardInfo } from "../components/MapPreviewCard/PreviewCardInfo";

export const Key: React.FC = ({ children }) => (
	<span className="key has-text-primary has-text-weight-bold">{children}</span>
);

export const Map = () => {
	const { mapID } = useParams();
	const { loading, data: mapData } = useEditMapQuery({
		variables: { mapID },
	});

	const { author, name, description, updatedAt, createdAt, size } = {
		...mapData?.map,
	} as MapConfig;

	return (
		<Layout style={{ alignItems: "flex-start" }}>
			{loading && <ProgressBar isColor="info" isSize="small" max="100" />}
			{mapData && (
				<>
					<Tile tag="section" isAncestor>
						<Tile isVertical isParent className="is-3">
							<Tile isChild className="content">
								<Box>
									<Title>About</Title>
									<BulmaTitle isSize={3}>{name}</BulmaTitle>
									author: <UserLink username={author} />
									{/* co-author: <UserLink username={author} /> */}
									<br />
									<Box>
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
									</Box>
								</Box>
							</Tile>
						</Tile>
						<Tile isParent>
							<Tile isChild className="content">
								<Box>
									<Title>Description</Title>
									<MarkdownRemark markdown={description} />
								</Box>
							</Tile>
						</Tile>
					</Tile>
				</>
			)}
		</Layout>
	);
};
