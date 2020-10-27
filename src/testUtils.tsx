import React from "react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { act } from "@testing-library/react";

import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { AuthProvider } from "./hooks/auth";
import { ScrollToTop } from "./common";
import { NotifyLayout } from "./components";

export const AllTheProviders: React.FC<{
	readonly mocks?: MockedResponse<Record<string, any>>[];
}> = ({ children, mocks, ...props }) => {
	return (
		<MockedProvider mocks={mocks} {...props}>
			<Router history={createMemoryHistory()}>
				<AuthProvider>
					<React.StrictMode>
						<ScrollToTop />
						{children}
						<NotifyLayout />
					</React.StrictMode>
				</AuthProvider>
			</Router>
		</MockedProvider>
	);
};

type Wait = (ms?: number) => Promise<void>;
export const wait: Wait = async (ms = 0) =>
	await act(() => {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	});
