import React from "react";
import { cleanup } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import { MockedProvider } from "@apollo/client/testing";
import Cookies from "js-cookie";

import { meMocks, data, jwt } from "./../mocks";
import { useAuthState, AuthProvider } from "../../hooks/auth";
import { User } from "../../types/graphql";

const wrapper: React.FC = ({ children }) => (
	<MockedProvider mocks={[meMocks]}>
		<AuthProvider>{children}</AuthProvider>
	</MockedProvider>
);

const loginPayload = {
	accessToken: jwt,
	refreshToken: "refreshToken",
};

const testHook = () =>
	renderHook(() => useAuthState(), {
		wrapper,
	});

afterEach(() => {
	cleanup();
	Cookies.remove("access_token");
	localStorage.removeItem("refresh_token");
});

describe("Auth hook", () => {
	it("renders correctly", () => {
		const { result } = testHook();
		expect(result.current.user).toBeNull();
	});

	it("login without autoSync works correctly", async () => {
		const { result } = testHook();
		expect(result.current.user?.id).toBeUndefined();

		act(() => result.current.login(loginPayload, false));

		expect(result.current.user?.id).toEqual(data.id);
		expect(result.current.user?.username).toEqual(data.username);
	});

	it("authorization status flags are working correctly", async () => {
		const { result } = testHook();

		expect(result.current.isError).toBeTruthy();
		expect(result.current.isPending).toBeFalsy();
		expect(result.current.isSuccess).toBeFalsy();
		expect(result.current.isAuthenticated).toBeFalsy();

		act(() => result.current.login(loginPayload, false));

		expect(result.current.isAuthenticated).toBeTruthy();
		expect(result.current.isSuccess).toBeTruthy();
		expect(result.current.isError).toBeFalsy();
		expect(result.current.isPending).toBeFalsy();

		act(() => result.current.logout());

		expect(result.current.isAuthenticated).toBeFalsy();
		expect(result.current.isSuccess).toBeFalsy();
		expect(result.current.isError).toBeFalsy();
		expect(result.current.isPending).toBeTruthy();
	});

	it("updateUser works correctly", async () => {
		const { result } = testHook();

		expect(result.current.user?.id).toBeUndefined();

		act(() => result.current.login(loginPayload, false));

		expect(result.current.user?.id).toEqual(data.id);
		expect(result.current.user?.username).toEqual(data.username);

		expect(result.current.user?.email).toBeUndefined();
		expect(result.current.user?.description).toBeUndefined();

		act(() =>
			result.current.updateUser({
				...result.current.user,
				description: "i'm amazing!",
				email: "fake@c.h",
			} as User),
		);

		expect(result.current.user?.id).toEqual(data.id);
		expect(result.current.user?.username).toEqual(data.username);

		expect(result.current.user?.description).toEqual("i'm amazing!");
		expect(result.current.user?.email).toEqual("fake@c.h");
	});
});
