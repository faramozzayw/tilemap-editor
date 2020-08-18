import React from "react";
import { Link } from "react-router-dom";
import {
	Button,
	NavbarItem,
	NavbarEnd,
	NavbarBurger,
	NavbarBrand,
	Navbar,
} from "../../bulma";
import { MapConfig } from "../../types";

import EditorNavbarStyle from "./EditorNavbar.module.css";

export interface EditorNavbar extends Pick<MapConfig, "name"> {}

export const EditorNavbar: React.FC<EditorNavbar> = ({ name }) => {
	return (
		<Navbar>
			<div className="container">
				<NavbarBrand>
					<Link
						to="/"
						className="navbar-item has-text-weight-bold is-family-code"
					>
						To Dashboard
					</Link>
					<NavbarBurger className="burger"></NavbarBurger>
				</NavbarBrand>
				<div id="navbarMenuHeroA" className="navbar-menu">
					<NavbarEnd>
						<NavbarItem>
							<span className={EditorNavbarStyle.MapName}>{name}</span>
						</NavbarItem>
						<NavbarItem>
							<Button isColor="light">
								<i
									className="fas fa-file-download"
									style={{ paddingRight: ".5rem" }}
								/>
								Download as JSON
							</Button>
						</NavbarItem>
					</NavbarEnd>
				</div>
			</div>
		</Navbar>
	);
};
