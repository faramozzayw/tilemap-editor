import React from "react";
import ReactMarkdown from "react-markdown";

import "./MarkdownRemark.css";
import { Content } from "../bulma";

export interface MarkdownRemark {
	markdown?: string | null;
}

export const MarkdownRemark: React.FC<MarkdownRemark> = ({ markdown }) =>
	markdown ? (
		<Content>
			<ReactMarkdown
				source={markdown}
				className="MarkdownRemark"
				linkTarget="_blank"
			/>
		</Content>
	) : null;
