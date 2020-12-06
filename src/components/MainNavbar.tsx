import React, { useState, Suspense } from "react";
import { NavLink, useHistory } from "react-router-dom";

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
	Button,
} from "@faramo.zayw/reabulma";

import "./MainNavbar.css";

const AvatarMenu = React.lazy(() => import("./AvatarMenu"));

export const MainNavbar = () => {
	const [isActive, togggleMenu] = useState(false);
	const { isAuthenticated, user } = useAuthState();
	const history = useHistory();

	return (
		<Navbar
			role="navigation"
			aria-label="main navigation"
			isFixedTop
			className="MainNavbar"
		>
			<NavbarBrand>
				<NavbarItem className="is-size-2 has-text-weight-bold">
					<NavLink to="/" className="has-text-light brand">
						TW!+
						{/*<i className="fas fa-shield-alt"></i>*/}
					</NavLink>
				</NavbarItem>

				<NavbarBurger
					className="has-text-white"
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
					<NavLink
						to="/"
						className="navbar-item link"
						exact
						activeClassName="ActiveLink"
					>
						<span>
							<i className="fas fa-tachometer-alt"></i> Dashbord
						</span>
					</NavLink>

					<NavLink
						to="/posts"
						className="navbar-item link"
						exact
						activeClassName="ActiveLink"
					>
						<span>
							<i className="fas fa-newspaper"></i> Posts
						</span>
					</NavLink>

					<NavLink
						to="/docs"
						className="navbar-item link"
						exact
						activeClassName="ActiveLink"
					>
						<span>
							<i className="fas fa-book"></i> Documentation
						</span>
					</NavLink>
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
									<Button
										isOutlined
										isColor="success"
										onClick={() => history.push("/signup")}
									>
										<strong>Sign up</strong>
									</Button>
									<Button
										isOutlined
										isColor="info"
										onClick={() => history.push("/login")}
									>
										<strong>Login</strong>
									</Button>
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
