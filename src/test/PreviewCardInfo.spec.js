import React from "react";
import { render } from "@testing-library/react";

import { MapPreviewCard } from "./../components";
import { BrowserRouter } from "react-router-dom";

const size = {
	row: 25,
	column: 25,
};

const okProps = {
	description: "**bold**, *italic*, ~~strike~~ __some_text__ ```code block```",
	size,
	createdAt: Date.now(),
	updatedAt: null,
};

test("renders correctly", () => {
	const { baseElement } = render(
		<BrowserRouter>
			<MapPreviewCard {...okProps} />
		</BrowserRouter>,
	);

	expect(baseElement).toMatchSnapshot();
});
