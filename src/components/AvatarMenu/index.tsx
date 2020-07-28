import React from "react";

import "./AvatarMenu.css";

import { NavbarItem, NavbarDropdown, NavbarDivider } from "./../../bulma";
import { LogOut } from "./../AuthForms";
import { Link } from "react-router-dom";

export interface AvatarMenuProps {
	image?: string;
	username: string;
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({ username, image }) => {
	return (
		<NavbarItem isHoverable hasDropdown className="AvatarMenu" tabIndex={0}>
			<NavbarItem>
				{image && (
					<figure className="image is-32x32">
						<img src={image} className="is-rounded" alt="User picture" />
					</figure>
				)}
				<span className="username">{username}</span>
			</NavbarItem>
			<NavbarDropdown className="is-right has-background-dark">
				<NavbarItem>
					<Link to="/profile">Profile</Link>
				</NavbarItem>
				<NavbarDivider />
				<NavbarItem>
					<LogOut />
				</NavbarItem>
			</NavbarDropdown>
		</NavbarItem>
	);
};

export default AvatarMenu;
