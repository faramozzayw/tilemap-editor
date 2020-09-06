import React from "react";
import { render } from "@testing-library/react";

import { PreviewCardFooter } from "./../components/MapPreviewCard";
import { BrowserRouter } from "react-router-dom";

const props = {
	id: "iu2h3u284u2s9-234242s2342",
	editHandler: () => {},
	forkHandler: () => {},
	viewHandler: () => {},
};

test("renders correctly", () => {
	const { baseElement } = render(
		<BrowserRouter>
			<PreviewCardFooter {...props} />
		</BrowserRouter>,
	);

	expect(baseElement).toMatchSnapshot();
});
