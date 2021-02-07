import React from "react";
import classnames from "classnames";

import styles from "./LikeButton.module.css";

export interface LikeButtonProps extends React.HTMLProps<HTMLElement> {
	isLiked?: boolean;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
	isLiked,
	...props
}) => (
	<span
		{...props}
		className={classnames("icon is-clickable", styles.likeButton)}
	>
		{isLiked ? (
			<i className={classnames("fas fa-heart", styles.liked)}></i>
		) : (
			<i className="far fa-heart"></i>
		)}
	</span>
);
