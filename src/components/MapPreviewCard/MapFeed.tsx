import React from "react";
import { QueryResult } from "@apollo/client";
import classnames from "classnames";

import { MapPreviewCard } from ".";
import {
	ProgressBar,
	Button,
	Notification,
	Title,
	Container,
} from "@faramo.zayw/reabulma";
import Masonry from "react-masonry-css";

import { IAuth } from "../../types/auth";
import MapFeedStyle from "./MapFeed.module.css";
import { Map } from "../../types/graphql";

export interface MapFeed extends Pick<QueryResult, "loading" | "error">, IAuth {
	maps?: Map[];
	onLoadMore?: () => void;
	refetch?: () => void;
}

const MapFeedError = () => (
	<Notification isColor="dark">
		<Title tag="h3" isSize="3">
			Oh no, we have a mistake! :(
		</Title>
		<span>
			But don't worry, this is not your fault! We will report this error to the
			world government and they will fix it!
		</span>
	</Notification>
);

const breakpointColumnsObj = {
	default: 3,
	850: 2,
	580: 1,
};

export const MapFeed: React.FC<MapFeed> = ({
	loading,
	error,
	maps,
	refetch,
	isAuth,
	onLoadMore,
}) => (
	<Container className={classnames(MapFeedStyle.Container)}>
		<section>
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="masonry-grid"
				columnClassName="masonry-grid_column"
			>
				{maps?.map((mapData) => (
					<MapPreviewCard {...mapData} isAuth={isAuth} key={mapData.id} />
				))}
			</Masonry>

			{loading && <ProgressBar isColor="primary" isSize="small" max="100" />}
		</section>
		{!error && !loading && (
			<Container className="has-text-centered">
				<Button
					onClick={onLoadMore}
					isColor="primary"
					isOutlined
					isSize="medium"
					disabled={loading}
					isLoading={loading}
				>
					Load more!
				</Button>
			</Container>
		)}

		{error && (
			<Container className="has-text-centered">
				<Notification isColor="info">
					Something is wrong with this world, but u can try again. Just click
					the button below
				</Notification>
				<Button
					onClick={refetch}
					isOutlined
					isFullWidth
					isColor="info"
					isSize="medium"
					disabled={loading}
					isLoading={loading}
				>
					TRY AGAIN!
				</Button>
			</Container>
		)}
	</Container>
);
