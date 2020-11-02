import React from "react";
import {
	NavbarItem,
	NavbarDropdown,
	NavbarDivider,
	Image,
	Button,
} from "@faramo.zayw/reabulma";

import "./AvatarMenu.css";

import { LogOut } from "./../AuthForms";
import { UserLink } from "../../common";
import { User } from "../../types/graphql";
import { Link } from "react-router-dom";

export interface AvatarMenuProps extends Pick<User, "imageUrl" | "username"> {}

const AvatarMenu: React.FC<AvatarMenuProps> = ({ username, imageUrl }) => (
	<NavbarItem isHoverable hasDropdown className="AvatarMenu" tabIndex={0}>
		<NavbarItem>
			{imageUrl ? (
				<Image isSize="32x32" src={imageUrl} isRounded alt="User picture" />
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
			<NavbarItem>
				<Link to="/me/setting">Setting</Link>
			</NavbarItem>
			<NavbarItem>
				<LogOut />
			</NavbarItem>
		</NavbarDropdown>
	</NavbarItem>
);

export default AvatarMenu;
