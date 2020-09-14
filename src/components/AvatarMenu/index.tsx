import React from "react";

import "./AvatarMenu.css";

import { NavbarItem, NavbarDropdown, NavbarDivider } from "./../../bulma";
import { LogOut } from "./../AuthForms";
import { User } from "../../types";
import { UserLink } from "../../common";

export interface AvatarMenuProps extends Pick<User, "image" | "username"> {}

const AvatarMenu: React.FC<AvatarMenuProps> = ({ username, image }) => (
	<NavbarItem isHoverable hasDropdown className="AvatarMenu" tabIndex={0}>
		<NavbarItem>
			{image ? (
				<figure className="image is-32x32">
					<img src={image} className="is-rounded" alt="User picture" />
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
