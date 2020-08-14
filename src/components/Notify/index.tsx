import React from "react";
import classnames from "classnames";

import { Portal } from "../../common";
import NotifyStyle from "./Notify.module.css";

export const NotifyLayout: React.FC = () => {
	return (
		<Portal className={NotifyStyle.wrapper}>
			<div className={classnames(NotifyStyle.notifyList)}>
				<div className="notification is-danger is-light">
					<button className="delete"></button>
					Primar lorem ipsum dolor sit amet, consectetur 1
				</div>
				<div className="notification is-danger is-light">
					<button className="delete"></button>
					Primar lorem ipsum dolor sit amet, consectetur 2
				</div>
				<div className="notification is-danger is-light">
					<button className="delete"></button>
					Primar lorem ipsum dolor sit amet, consectetur 1
				</div>
				<div className="notification is-danger is-light">
					<button className="delete"></button>
					Primar lorem ipsum dolor sit amet, consectetur 2
				</div>
				<div className="notification is-danger is-light">
					<button className="delete"></button>
					Primar lorem ipsum dolor sit amet, consectetur 1
				</div>
				<div className="notification is-danger is-light">
					<button className="delete"></button>
					Primar lorem ipsum dolor sit amet, consectetur 2
				</div>

				<div className="notification is-danger is-light">
					<button className="delete"></button>
					Primar lorem ipsum dolor sit amet, consectetur 1
				</div>
				<div className="notification is-danger is-light">
					<button className="delete"></button>
					Primar lorem ipsum dolor sit amet, consectetur 2
				</div>
				<div className="notification is-danger is-light">
					<button className="delete"></button>
					Primar lorem ipsum dolor sit amet, consectetur 1
				</div>
				<div className="notification is-danger is-light">
					<button className="delete"></button>
					Primar lorem ipsum dolor sit amet, consectetur 2
				</div>
			</div>
		</Portal>
	);
};
