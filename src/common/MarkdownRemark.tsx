import React from "react";
import ReactMarkdown from "react-markdown";

import "./MarkdownRemark.css";

export interface MarkdownRemark {
	markdown: string;
}

export const MarkdownRemark: React.FC<MarkdownRemark> = ({ markdown }) => (
	<ReactMarkdown
		source={markdown}
		className="MarkdownRemark"
		linkTarget="_blank"
	/>
);
