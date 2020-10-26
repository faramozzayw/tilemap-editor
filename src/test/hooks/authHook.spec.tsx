import React from "react";
import { render, act, cleanup, waitFor } from "@testing-library/react";
import Cookies from "js-cookie";

import { AllTheProviders, wait as sleep } from "../../testUtils";
import { loginMocks, meMocks, data, jwt } from "./../mocks";
import { useAuthState, AuthHook } from "../../hooks/auth";
import { User } from "../../types/graphql";

let result: AuthHook | null;

function TestComponent() {
	result = useAuthState();
	return null;
}

beforeEach(() => {
	window.scrollTo = () => {};
});

afterEach(() => {
	cleanup();
	result = null;
	Cookies.remove("access_token");
	localStorage.removeItem("refresh_token");
});

describe("Auth hook", () => {
	it("renders correctly", () => {
		act(() => {
			render(
				<AllTheProviders>
					<TestComponent />
				</AllTheProviders>,
			);
		});
	});

	it("login without autoSync works correctly", async () => {
		act(() => {
			render(
				<AllTheProviders mocks={[meMocks]}>
					<TestComponent />
				</AllTheProviders>,
			);
		});

		if (!result) throw "Authentication provider failed to render";
		expect(result.user?.id).toBeUndefined();

		await act(() =>
			waitFor(() =>
				result?.login(
					{
						accessToken: jwt,
						refreshToken: "refreshToken",
					},
					false,
				),
			),
		);

		expect(result.user?.id).toEqual(data.id);
		expect(result.user?.username).toEqual(data.username);
	});

	it("updateUser works correctly", async () => {
		act(() => {
			render(
				<AllTheProviders mocks={[meMocks]}>
					<TestComponent />
				</AllTheProviders>,
			);
		});

		if (!result) throw "Authentication provider failed to render";
		expect(result.user?.id).toBeUndefined();

		await act(() =>
			waitFor(() =>
				result?.login(
					{
						accessToken: jwt,
						refreshToken: "refreshToken",
					},
					false,
				),
			),
		);

		expect(result.user?.id).toEqual(data.id);
		expect(result.user?.username).toEqual(data.username);

		expect(result.user?.email).toBeUndefined();
		expect(result.user?.description).toBeUndefined();

		await act(() =>
			waitFor(() => {
				if (!result) throw "Authentication provider failed to render";

				result.updateUser({
					...result.user,
					description: "im amazing!",
					email: "fake@c.h",
				} as User);
			}),
		);

		expect(result.user?.description).toEqual("im amazing!");
		expect(result.user?.email).toEqual("fake@c.h");
	});
});
