import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export interface PortalProps {
	className?: string;
	tag?: keyof React.ReactHTML;
	children: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = ({
	className,
	tag = "div",
	children,
}) => {
	if (typeof document === "undefined") return null;

	const modalRoot = document.createElement(tag);

	modalRoot.classList.add("modalRoot");

	if (className) {
		modalRoot.classList.add(className);
	}

	useEffect(() => {
		document.body.appendChild(modalRoot);

		return () => {
			document.body.removeChild(modalRoot);
		};
	});

	return ReactDOM.createPortal(children, modalRoot);
};
