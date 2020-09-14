import React from "react";
import { useParams } from "react-router-dom";

import { ProgressBar, Title as BulmaTitle, Tile } from "../bulma";
import { useGetMapByIdQuery, Map as MapType } from "../types/graphql";
import {
	Layout,
	UserLink,
	MarkdownRemark,
	Box,
	Title,
	MapName,
} from "../common";
import { PreviewCardInfo } from "../components/MapPreviewCard";

export const Key: React.FC = ({ children }) => (
	<span className="has-text-primary has-text-weight-bold">{children}</span>
);

export const Map = () => {
	const { mapID } = useParams();
	const { loading, data: mapData } = useGetMapByIdQuery({
		variables: { mapID },
	});

	const { author, name, description, ...props } = {
		...mapData?.map,
	} as MapType;

	return (
		<Layout style={{ alignItems: "flex-start" }}>
			{loading && <ProgressBar isColor="info" isSize="small" max="100" />}
			{mapData && (
				<Tile tag="section" isAncestor>
					<Tile isVertical isParent className="is-3">
						<Tile isChild className="content">
							<Box>
								<Title>About</Title>
								<BulmaTitle isSize={3}>
									<MapName name={name} />
								</BulmaTitle>
								<p>
									author: <UserLink {...author} />
								</p>
								<p>
									co-author: <UserLink {...author} />, <UserLink {...author} />,{" "}
									<UserLink {...author} />
								</p>
								<br />
								<Box>
									<PreviewCardInfo {...props} />
								</Box>
							</Box>
						</Tile>
					</Tile>
					<Tile isParent isVertical>
						<Tile isChild className="content">
							<Box>
								<Title>Description</Title>
								<MarkdownRemark markdown={description} />
							</Box>
						</Tile>
						<Tile isChild>
							<Box>
								<Title>Screenshot</Title>
								<div
									style={{
										display: "flex",
										flexWrap: "wrap",
										alignItems: "center",
										justifyContent: "space-around",
									}}
								>
									<figure className="image is-128x128">
										<img src="https://bulma.io/images/placeholders/480x480.png" />
									</figure>
									<figure className="image is-128x128">
										<img src="https://bulma.io/images/placeholders/480x480.png" />
									</figure>
									<figure className="image is-128x128">
										<img src="https://bulma.io/images/placeholders/480x480.png" />
									</figure>
									<figure className="image is-128x128">
										<img src="https://bulma.io/images/placeholders/480x480.png" />
									</figure>
								</div>
							</Box>
						</Tile>
					</Tile>
				</Tile>
			)}
		</Layout>
	);
};
