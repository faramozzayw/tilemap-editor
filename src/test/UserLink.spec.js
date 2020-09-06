import React from "react";
import { render } from "@testing-library/react";

import { UserLink } from "./../common";
import { BrowserRouter } from "react-router-dom";

test("renders correctly", () => {
	const { baseElement } = render(
		<BrowserRouter>
			<UserLink username={"username"} />
		</BrowserRouter>,
	);

	expect(baseElement).toMatchSnapshot();
});

test("renders with username", () => {
	const username = "_user_2e";
	const { getByText } = render(
		<BrowserRouter>
			<UserLink username={username} />
		</BrowserRouter>,
	);

	const linkElement = getByText(RegExp(`${username}`, "g"));
	expect(linkElement).toBeInTheDocument();
});

test("renders without username", () => {
	const { queryByText } = render(
		<BrowserRouter>
			<UserLink />
		</BrowserRouter>,
	);

	const linkElement = queryByText(/username/i);
	expect(linkElement).not.toBeInTheDocument();
});

test("renders with correct href", () => {
	const username = "_user_2e";
	const link = `/@${username}`;

	const { getByText } = render(
		<BrowserRouter>
			<UserLink username={username} />
		</BrowserRouter>,
	);

	const linkElement = getByText(RegExp(`${username}`, "g"));
	expect(linkElement).toHaveAttribute("href", link);
});
