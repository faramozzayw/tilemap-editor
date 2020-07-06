import React, { useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

import { Button } from "./../bulma";

export const MainNavbar = () => {
	const [isActive, togggleMenu] = useState(false);

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

					<Link to="/editor" className="navbar-item">
						Start edit
					</Link>
				</div>
				<div className="navbar-end">
					<div className="navbar-item">
						<div className="buttons">
							<Button isOutlined isColor="success">
								<strong>Sign up</strong>
							</Button>
							<Button isOutlined isColor="info">
								Log in
							</Button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
