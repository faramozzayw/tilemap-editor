import React from "react";
import { QueryResult } from "@apollo/client";
import classnames from "classnames";

import { MapPreviewCard } from ".";
import {
	ProgressBar,
	Button,
	Notification,
	Title,
} from "@faramo.zayw/reabulma";
import Masonry from "react-masonry-css";

import { IAuth } from "../../types/auth";
import MapFeedStyle from "./MapFeed.module.css";
import { Map } from "../../types/graphql";

export interface MapFeed extends Pick<QueryResult, "loading" | "error">, IAuth {
	maps?: Map[];
	onLoadMore?: () => void;
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
	700: 2,
	500: 1,
};

export const MapFeed: React.FC<MapFeed> = ({
	loading,
	error,
	maps,
	isAuth,
	onLoadMore,
}) => (
	<div className={classnames("container", MapFeedStyle.Container)}>
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

			{error && <MapFeedError />}

			{loading && <ProgressBar isColor="primary" isSize="small" max="100" />}
		</section>
		{!error && (
			<div className="container has-text-centered">
				<Button
					onClick={onLoadMore}
					isColor="light"
					disabled={loading}
					isLoading={loading}
				>
					Load more!
				</Button>
			</div>
		)}
	</div>
);
