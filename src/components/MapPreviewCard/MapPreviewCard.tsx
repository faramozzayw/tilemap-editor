import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useMutation, ApolloError } from "@apollo/client";

import { Title, Card, CardContent } from "./../../bulma";
import { MapConfig } from "./../../types";

import "./index.css";
import { PreviewCardInfo } from "./PreviewCardInfo";
import { IAuth } from "../../types/auth";
import { PreviewCardFooter } from "./PreviewCardFooter";
import { DELETE_MAP_BY_ID, GET_MAPS, GET_MAPS_BY_USER } from "../../graphql";
import { addNotification } from "../../store/notificationStore";
import { useAuthState } from "../../hooks/auth";
import { useDeleteMapMutation } from "../../types/graphql";

export interface MapPreviewCardProps extends MapConfig, IAuth {}

export const MapPreviewCard: React.FC<MapPreviewCardProps> = ({
	author,
	name,
	id,
	isAuth,
	...props
}) => {
	const history = useHistory();
	const { user } = useAuthState();

	const [deleteMap] = useDeleteMapMutation({
		variables: { mapID: id },
		refetchQueries: [
			{ query: GET_MAPS },
			{
				query: GET_MAPS_BY_USER,
				variables: {
					username: user?.username,
				},
			},
		],
		onCompleted: () =>
			addNotification({
				type: "success",
				message: "Map successfully deleted!",
			}),
		onError: (e) =>
			addNotification({
				type: "danger",
				message: e.message,
			}),
	});

	const editHandler = () => history.push(`/editor/${id}`);
	const forkHandler = () => alert("forked!");
	const deleteHandler = () => {
		if (window.confirm("Are you sure about that, honey?")) {
			deleteMap();
		}
	};

	const authorURL = `@${author}`;

	return (
		<Card className="MapPreviewCard has-background-grey-dark has-text-primary-light is-clipped">
			<CardContent>
				<div className="media">
					<div className="media-left">
						<figure className="image is-48x48">
							<img
								src="https://bulma.io/images/placeholders/96x96.png"
								alt="Test image"
							/>
						</figure>
					</div>
					<div className="media-content">
						<Title isSize={4} className="mapname">
							{name}
						</Title>
						<Title tag="p" isSubtitle isSize={6}>
							<Link className="username" to={authorURL}>
								{authorURL}
							</Link>
						</Title>
					</div>
				</div>

				<PreviewCardInfo {...props} />
			</CardContent>
			{isAuth && (
				<PreviewCardFooter
					id={id}
					deleteHandler={deleteHandler}
					editHandler={editHandler}
					forkHandler={forkHandler}
				/>
			)}
		</Card>
	);
};
