import React from "react";
import ReactMarkdown from "react-markdown";
import { Content } from "@faramo.zayw/reabulma";

import "./MarkdownRemark.css";

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
