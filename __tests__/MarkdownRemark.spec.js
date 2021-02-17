import React from "react";
import { render } from "@testing-library/react";

import { MarkdownRemark } from "./../common";

test("renders correctly", () => {
	const { baseElement } = render(
		<MarkdownRemark
			markdown={"**bold**, *italic*, ~~strike~~ __some_text__ ```code block```"}
		/>,
	);

	expect(baseElement).toMatchSnapshot();
});
