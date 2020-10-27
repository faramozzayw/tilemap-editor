import React from "react";
import {
	render,
	screen,
	fireEvent,
	act,
	cleanup,
	waitFor,
} from "@testing-library/react";
import { NotFound } from "../../pages";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

afterEach(cleanup);

describe("Not Found page", () => {
	it("render correctly", () => {
		const history = createMemoryHistory();
		history.push("/awesomepath");
		const { getByText } = render(
			<Router history={history}>
				<NotFound />
			</Router>,
		);

		expect(getByText(/\/awesomepath/i)).toBeInTheDocument();
	});
});
