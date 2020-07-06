import React from "react";
import { Link } from "react-router-dom";

export const EditorNavbar: React.FC = () => {
	return (
		<nav className="navbar">
			<div className="container">
				<div className="navbar-brand">
					<Link
						to="/"
						className="navbar-item has-text-weight-bold is-family-code"
					>
						HexMap Editor
					</Link>
					<span className="navbar-burger burger" data-target="navbarMenuHeroA">
						<span />
						<span />
						<span />
					</span>
				</div>
				<div id="navbarMenuHeroA" className="navbar-menu">
					<div className="navbar-end">
						<a href="test" className="navbar-item is-active">
							Home
						</a>
						<a href="test" className="navbar-item">
							Examples
						</a>
						<a href="test" className="navbar-item">
							Documentation
						</a>
						<span className="navbar-item">
							<a href="test" className="button is-primary is-inverted">
								<span className="icon">
									<i className="fab fa-github" />
								</span>
								<span>Download</span>
							</a>
						</span>
					</div>
				</div>
			</div>
		</nav>
	);
};
