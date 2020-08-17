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

export const EditorNavbar: React.FC = () => {
	return (
		<Navbar>
			<div className="container">
				<NavbarBrand>
					<Link
						to="/"
						className="navbar-item has-text-weight-bold is-family-code"
					>
						HexMap Editor
					</Link>
					<NavbarBurger className="burger"></NavbarBurger>
				</NavbarBrand>
				<div id="navbarMenuHeroA" className="navbar-menu">
					<NavbarEnd>
						<NavbarItem>Map name</NavbarItem>
						<NavbarItem>
							<Button isColor="light">Download as JSON</Button>
						</NavbarItem>
					</NavbarEnd>
				</div>
			</div>
		</Navbar>
	);
};
