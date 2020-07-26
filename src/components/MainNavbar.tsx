import React, { useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

import { Button } from "./../bulma";
import { CreateMapModal } from "./CreateMapModal";
import { LogOut, LogIn, SignUp } from "./AuthForms";
import { Protected } from "./Protected";
import { AuthProvider, AuthContext, useAuthState } from "../hooks/auth";

export const MainNavbar = () => {
	const [isActive, togggleMenu] = useState(false);
	const [modalActive, toggleModal] = useState(false);

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
						Home
					</Link>

					<Link to="/docs" className="navbar-item">
						Documentation
					</Link>
					<div className="navbar-item">
						<Button
							isOutlined
							isColor="primary"
							onClick={() => toggleModal(true)}
						>
							Create map!
						</Button>
						<CreateMapModal
							isActive={modalActive}
							closeModal={() => toggleModal(false)}
						/>
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
