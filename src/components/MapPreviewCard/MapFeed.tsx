import React from "react";
import { QueryResult } from "@apollo/client";
import classnames from "classnames";

import { IAuth } from "../../types/auth";
import { MapPreviewCard } from ".";
import {
	ProgressBar,
	Button,
	Notification,
	Title,
} from "@faramo.zayw/reabulma";

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

export const MapFeed: React.FC<MapFeed> = ({
	loading,
	error,
	maps,
	isAuth,
	onLoadMore,
}) => (
	<div className={classnames("container", MapFeedStyle.Container)}>
		<div className="columns is-multiline is-left" style={{ flex: "1" }}>
			{maps?.map((mapData) => (
				<div className="column is-4" key={mapData.id}>
					<MapPreviewCard {...mapData} isAuth={isAuth} />
				</div>
			))}

			{error && <MapFeedError />}

			{loading && <ProgressBar isColor="primary" isSize="small" max="100" />}
		</div>
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
