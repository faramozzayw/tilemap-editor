import React from "react";
import {
	render,
	screen,
	fireEvent,
	act,
	cleanup,
	waitFor,
} from "@testing-library/react";
import { Login } from "../__pages";
import { AllTheProviders, wait } from "../testUtils";
import { loginMocks, meMocks, data } from "./mocks";

beforeEach(() => {
	// just mock
	window.scrollTo = () => {};
});

afterEach(() => cleanup());

describe("Login", () => {
	it("renders Login page", async () => {
		render(
			<AllTheProviders>
				<Login />
			</AllTheProviders>,
		);

		await wait(15);

		expect(screen.getByText(/username/i)).toBeInTheDocument();
		expect(screen.getByText(/password/i)).toBeInTheDocument();
	});

	it("username input works correctly", async () => {
		render(
			<AllTheProviders>
				<Login />
			</AllTheProviders>,
		);

		await wait(15);

		const username = screen.getByRole("textbox") as HTMLInputElement;
		expect(username.value).toEqual("");

		fireEvent.change(username, {
			target: { value: "faramo_zayw" },
		});
		expect(username.value).toEqual("faramo_zayw");

		fireEvent.change(username, {
			target: { value: "faramo" },
		});
		expect(username.value).toEqual("faramo");
	});

	it("password input works correctly", async () => {
		render(
			<AllTheProviders>
				<Login />
			</AllTheProviders>,
		);

		await wait(15);

		const password = screen.getByPlaceholderText(
			/password/i,
		) as HTMLInputElement;
		expect(password.value).toEqual("");

		fireEvent.change(password, {
			target: { value: "k91231293u129" },
		});
		expect(password.value).toEqual("k91231293u129");

		fireEvent.change(password, {
			target: { value: "k9123" },
		});
		expect(password.value).toEqual("k9123");
	});

	it("reset button works correctly", async () => {
		render(
			<AllTheProviders>
				<Login />
			</AllTheProviders>,
		);

		await wait(15);

		const username = screen.getByRole("textbox") as HTMLInputElement;
		expect(username.value).toEqual("");

		const password = screen.getByPlaceholderText(
			/password/i,
		) as HTMLInputElement;
		expect(password.value).toEqual("");

		const resetButton = screen
			.getByText(/reset/i)
			.closest("button") as HTMLButtonElement;

		expect(resetButton).toHaveAttribute("type", "reset");

		fireEvent.change(username, {
			target: { value: "faramo_zayw" },
		});
		expect(username.value).toEqual("faramo_zayw");

		fireEvent.change(password, {
			target: { value: "k91231293u129" },
		});
		expect(password.value).toEqual("k91231293u129");

		fireEvent.reset(resetButton);

		expect(username.value).toEqual("");
		expect(password.value).toEqual("");
	});

	it("submit works correctly", async () => {
		const { container } = render(
			<AllTheProviders mocks={[...loginMocks, meMocks]}>
				<Login />
			</AllTheProviders>,
		);

		await wait(15);

		const username = container.querySelector(
			`input[name="username"]`,
		) as HTMLInputElement;
		expect(username.value).toEqual("");

		const password = container.querySelector(
			`input[name="password"]`,
		) as HTMLInputElement;
		expect(password.value).toEqual("");

		const submitButton = container.querySelector(
			`button[type="submit"]`,
		) as HTMLButtonElement;
		expect(submitButton).toHaveAttribute("type", "submit");

		await waitFor(() =>
			fireEvent.change(username, {
				target: { value: data.username },
			}),
		);
		expect(username.value).toEqual(data.username);

		await waitFor(() =>
			fireEvent.change(password, {
				target: { value: data.password },
			}),
		);
		expect(password.value).toEqual(data.password);

		act(() => {
			fireEvent.submit(submitButton);
		});
		expect(await screen.findByText(/success/i)).toBeInTheDocument();
	});
});
