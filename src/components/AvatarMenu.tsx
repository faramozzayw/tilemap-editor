import React from "react";

import { NavbarItem } from "../bulma";
import { LogOut } from "./AuthForms";
import { NavbarDropdown, NavbarDivider } from "../bulma";

export interface AvatarMenuProps {
	image?: string;
	username: string;
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({ username, image }) => {
	return (
		<NavbarItem isHoverable hasDropdown>
			<NavbarItem>
				{image && (
					<figure className="image is-32x32">
						<img src={image} className="is-rounded" alt="User picture" />
					</figure>
				)}
				<span>{username}</span>
			</NavbarItem>
			<NavbarDropdown className="is-right has-background-dark">
				<NavbarItem>Profile</NavbarItem>
				<NavbarDivider />
				<NavbarItem>
					<LogOut />
				</NavbarItem>
			</NavbarDropdown>
		</NavbarItem>
	);
};

export default AvatarMenu;
