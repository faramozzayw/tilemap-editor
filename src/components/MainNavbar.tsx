import React, { useState, Suspense, CSSProperties } from "react";
import { Link } from "react-router-dom";

import { LogIn, SignUp } from "./AuthForms";
import { Protected } from "./../common";
import { useAuthState } from "../hooks/auth";
import { CreateMap } from "./CreateMap";
import {
	NavbarItem,
	NavbarEnd,
	NavbarStart,
	NavbarMenu,
	NavbarBurger,
	NavbarBrand,
	Navbar,
} from "../bulma";

import "./MainNavbar.css";

const AvatarMenu = React.lazy(() => import("./AvatarMenu"));

export const MainNavbar = () => {
	const [isActive, togggleMenu] = useState(false);
	const { isAuthenticated, user } = useAuthState();

	return (
		<Navbar
			role="navigation"
			aria-label="main navigation"
			isFixedTop
			className="MainNavbar"
		>
			<NavbarBrand>
				<NavbarItem className="is-size-2 has-text-weight-bold is-family-code">
					<Link to="/" className="has-text-light">
						TW!+
					</Link>
				</NavbarItem>

				<NavbarBurger
					isActive={isActive}
					onClick={() => togggleMenu(!isActive)}
				/>
			</NavbarBrand>

			<NavbarMenu
				id="navbarBasicExample"
				isActive={isActive}
				className="MainNavbar"
			>
				<NavbarStart>
					<Link to="/" className="navbar-item link">
						<span>
							<i className="fas fa-tachometer-alt"></i> Dashbord
						</span>
					</Link>

					<Link to="/docs" className="navbar-item link">
						<span>
							<i className="fas fa-book"></i> Documentation
						</span>
					</Link>
					<NavbarItem>
						<Protected isAuth={isAuthenticated} render={() => <CreateMap />} />
					</NavbarItem>
				</NavbarStart>
				<NavbarEnd>
					<NavbarItem>
						<Protected
							isAuth={isAuthenticated}
							fail={() => (
								<div className="buttons">
									<SignUp />
									<LogIn />
								</div>
							)}
							render={() => (
								<Suspense fallback={"Loading..."}>
									<AvatarMenu username={user!.username} {...user} />
								</Suspense>
							)}
						/>
					</NavbarItem>
				</NavbarEnd>
			</NavbarMenu>
		</Navbar>
	);
};
