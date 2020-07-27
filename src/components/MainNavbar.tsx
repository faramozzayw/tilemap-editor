import React, { useState, Suspense } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

import { LogIn, SignUp } from "./AuthForms";
import { Protected } from "./../common";
import { useAuthState } from "../hooks/auth";
import { CreateMap } from "./CreateMap";
import { NavbarItem } from "../bulma";

const AvatarMenu = React.lazy(() => import("./AvatarMenu"));

export const MainNavbar = () => {
	const [isActive, togggleMenu] = useState(false);
	const { isAuthenticated, user } = useAuthState();

	return (
		<nav
			className="navbar is-dark"
			role="navigation"
			aria-label="main navigation"
		>
			<div className="navbar-brand">
				<div className="navbar-item is-size-2 has-text-weight-bold is-family-code">
					TW!+
				</div>
				<a
					role="button"
					className={classnames("navbar-burger burger", {
						"is-active": isActive,
					})}
					onClick={() => togggleMenu(!isActive)}
					aria-label="menu"
					aria-expanded="false"
					data-target="navbarBasicExample"
				>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div
				id="navbarBasicExample"
				className={classnames("navbar-menu", {
					"is-active": isActive,
				})}
			>
				<div className="navbar-start">
					<Link to="/" className="navbar-item">
						Dashbord
					</Link>

					<Link to="/docs" className="navbar-item">
						Documentation
					</Link>
					<NavbarItem>
						<Protected isAuth={isAuthenticated} render={() => <CreateMap />} />
					</NavbarItem>
				</div>
				<div className="navbar-end">
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
				</div>
			</div>
		</nav>
	);
};
