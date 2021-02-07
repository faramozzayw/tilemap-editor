import React from "react";
import { render } from "@testing-library/react";

import { Title } from "./../common";

test("renders correctly", () => {
	const { baseElement } = render(
		<Title>
			<span>Some span</span>
		</Title>,
	);

	expect(baseElement).toMatchSnapshot();
});

test("renders correctly without children", () => {
	const { container } = render(<Title></Title>);

	expect(container.first).toBeUndefined();
});
