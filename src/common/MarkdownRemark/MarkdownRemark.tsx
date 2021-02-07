import React from "react";
import ReactMarkdown from "react-markdown";
import { Content } from "@faramo.zayw/reabulma";

import styles from "./MarkdownRemark.module.css";

export interface MarkdownRemark {
	markdown?: string | null;
}

export const MarkdownRemark: React.FC<MarkdownRemark> = ({ markdown }) =>
	markdown ? (
		<Content>
			<ReactMarkdown
				source={markdown}
				className={styles.MarkdownRemark}
				linkTarget="_blank"
			/>
		</Content>
	) : null;
