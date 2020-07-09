import React from "react";
import "./index.css";

export const Panel = ({}) => {
	return (
		<nav className="panel is-info canvas-panel">
			<p className="panel-heading">Repositories</p>
			<div className="panel-block">
				<p className="control has-icons-left">
					<input className="input" type="text" placeholder="Search" />
					<span className="icon is-left">
						<i className="fas fa-search" aria-hidden="true"></i>
					</span>
				</p>
			</div>
			<a className="panel-block is-active">
				<span className="panel-icon">
					<i className="fas fa-book" aria-hidden="true"></i>
				</span>
				bulma
			</a>
			<a className="panel-block">
				<span className="panel-icon">
					<i className="fas fa-book" aria-hidden="true"></i>
				</span>
				marksheet
			</a>
			<a className="panel-block">
				<span className="panel-icon">
					<i className="fas fa-book" aria-hidden="true"></i>
				</span>
				minireset.css
			</a>
			<a className="panel-block">
				<span className="panel-icon">
					<i className="fas fa-book" aria-hidden="true"></i>
				</span>
				jgthms.github.io
			</a>
			<a className="panel-block">
				<span className="panel-icon">
					<i className="fas fa-code-branch" aria-hidden="true"></i>
				</span>
				daniellowtw/infboard
			</a>
			<a className="panel-block">
				<span className="panel-icon">
					<i className="fas fa-code-branch" aria-hidden="true"></i>
				</span>
				mojs
			</a>
			<label className="panel-block">
				<input type="checkbox" />
				remember me
			</label>
			<div className="panel-block">
				<button className="button is-link is-outlined is-fullwidth">
					Reset all
				</button>
			</div>
		</nav>
	);
};
