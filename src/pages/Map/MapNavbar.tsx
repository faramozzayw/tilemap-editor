import React from "react";
import { NavLink } from "react-router-dom";

import { Tabs, Tab } from "@faramo.zayw/reabulma";
import { Map, User } from "../../types/graphql";
import { UserLink, MapName, Can } from "../../common";

import styles from "./Map.module.css";

export interface MapNavbarProps extends Pick<Map, "author" | "id" | "name"> {
	currentUser: User;
}

export const MapNavbar: React.FC<MapNavbarProps> = ({
	author,
	id,
	name,
	currentUser,
}) => (
	<div className={styles.pageNav}>
		<nav
			className="breadcrumb"
			aria-label="breadcrumbs"
			style={{ fontSize: "1.2rem" }}
		>
			<ul>
				<li>
					<UserLink {...author} />
				</li>
				<li>
					<MapName name={name} to={`/maps/${id}`} />
				</li>
			</ul>
		</nav>
		<Tabs isBoxed isAlign="left" isSize="normal" className="scrollbar">
			<ul>
				<Tab>
					<NavLink to={`/maps/${id}/`} exact activeClassName={styles.active}>
						<span className="icon is-small">
							<i className="fas fa-info" aria-hidden="true"></i>
						</span>
						<span>Info</span>
					</NavLink>
				</Tab>
				<Can
					role="user"
					perform="map:edit"
					data={{ userId: currentUser.id, ownerId: author.id }}
				>
					<Tab>
						<NavLink to={`/maps/${id}/setting`} activeClassName={styles.active}>
							<span className="icon is-small">
								<i className="fas fa-cogs" aria-hidden="true"></i>
							</span>
							<span>Setting</span>
						</NavLink>
					</Tab>
				</Can>
			</ul>
		</Tabs>
	</div>
);
