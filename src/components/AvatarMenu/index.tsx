import React from "react";

import "./AvatarMenu.css";

import { NavbarItem, NavbarDropdown, NavbarDivider } from "./../../bulma";
import { LogOut } from "./../AuthForms";
import { UserLink } from "../../common";
import { User } from "../../types/graphql";

export interface AvatarMenuProps extends Pick<User, "imageUrl" | "username"> {}

const AvatarMenu: React.FC<AvatarMenuProps> = ({ username, imageUrl }) => (
	<NavbarItem isHoverable hasDropdown className="AvatarMenu" tabIndex={0}>
		<NavbarItem>
			{imageUrl ? (
				<figure className="image is-32x32">
					<img src={imageUrl} className="is-rounded" alt="User picture" />
				</figure>
			) : (
				<figure className="DefaultAvatar image is-32x32">
					<i className="far fa-user fa-lg"></i>
				</figure>
			)}
			<span className="username">{username}</span>
		</NavbarItem>
		<NavbarDropdown className="is-right has-background-dark">
			<NavbarItem>
				<UserLink username={username} />
			</NavbarItem>
			<NavbarDivider />
			<NavbarItem>
				<LogOut />
			</NavbarItem>
		</NavbarDropdown>
	</NavbarItem>
);

export default AvatarMenu;
