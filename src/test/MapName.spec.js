import React from "react";
import { render } from "@testing-library/react";

import { MapName } from "./../common";

test("renders correctly", () => {
	const { baseElement } = render(<MapName name={"Some map name"} />);

	expect(baseElement).toMatchSnapshot();
});
