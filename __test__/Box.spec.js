import React from "react";
import { render } from "@testing-library/react";

import { Box } from "./../common";

test("renders correctly", () => {
	const { baseElement } = render(
		<Box>
			<h1>Some title</h1>
			<p>Some cool text</p>
		</Box>,
	);

	expect(baseElement).toMatchSnapshot();
});
