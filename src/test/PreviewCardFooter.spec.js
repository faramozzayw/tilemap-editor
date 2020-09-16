import React from "react";
import { render } from "@testing-library/react";

import { PreviewCardFooter } from "./../components/MapPreviewCard";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../hooks/auth";

const props = {
	id: "iu2h3u284u2s9-234242s2342",
	editHandler: () => {},
	forkHandler: () => {},
	viewHandler: () => {},
	author: {
		id: "e8b1c3aa-e088-4129-8ca0-358fee0cb480",
	},
};

test("renders correctly", () => {
	const { baseElement } = render(
		<AuthProvider>
			<BrowserRouter>
				<PreviewCardFooter {...props} />
			</BrowserRouter>
		</AuthProvider>,
	);

	expect(baseElement).toMatchSnapshot();
});
