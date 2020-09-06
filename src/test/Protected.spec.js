import React from "react";
import { render } from "@testing-library/react";

import { Protected } from "./../common";

const failText = "Fail component";
const renderText = "Render text";

const RenderComponent = () => <span>{renderText}</span>;
const FailComponent = () => <span>{failText}</span>;

const regExpFlags = "ig";

test("renders with incorrect param `isAuth` without `fail` param", () => {
	const { queryByText } = render(<Protected render={RenderComponent} />);

	const renderElement = queryByText(RegExp(`${renderText}`, regExpFlags));
	expect(renderElement).not.toBeInTheDocument();
});

test("renders with incorrect param `isAuth` with `fail` param", () => {
	const { queryByText } = render(
		<Protected render={RenderComponent} fail={FailComponent} />,
	);

	const failElement = queryByText(RegExp(`${failText}`, regExpFlags));
	expect(failElement).toBeInTheDocument();
});

test("renders with correct param `isAuth` without `fail` param", () => {
	const { queryByText } = render(<Protected render={RenderComponent} isAuth />);

	const renderElement = queryByText(RegExp(`${renderText}`, regExpFlags));
	expect(renderElement).toBeInTheDocument();
});

test("renders with correct param `isAuth` with `fail` param", () => {
	const { queryByText } = render(
		<Protected render={RenderComponent} fail={FailComponent} isAuth />,
	);

	const renderElement = queryByText(RegExp(`${renderText}`, regExpFlags));
	expect(renderElement).toBeInTheDocument();
});
