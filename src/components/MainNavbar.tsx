import React, { useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

import { LogOut, LogIn, SignUp } from "./AuthForms";
import { Protected } from "./../common";
import { useAuthState } from "../hooks/auth";
import { CreateMap } from "./CreateMap";

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
					<div className="navbar-item">
						<Protected isAuth={isAuthenticated} render={() => <CreateMap />} />
					</div>
				</div>
				<div className="navbar-end">
					<div className="navbar-item">
						<div className="buttons">
							<Protected
								isAuth={isAuthenticated}
								fail={() => (
									<>
										<SignUp />
										<LogIn />
									</>
								)}
								render={() => (
									<>
										<p>{user?.username}</p>
										<LogOut />
									</>
								)}
							/>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
