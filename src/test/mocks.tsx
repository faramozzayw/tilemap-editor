import { LoginDocument, MeDocument } from "../types/graphql";
import { GraphQLError } from "graphql";

export const data = {
	username: "faramo_zayw",
	password: "k91231293u129",
};

/**
 * @see https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlzM2lzZDlwMmFpczM0MDFpIiwidXNlcm5hbWUiOiJmYXJhbW9femF5dyIsImV4cCI6MTUxMjYyMzkwMjIyfQ.3krY_bxzFwlzNalL2GTT53Bjah2VPFptJnvW3sJJ7jA
 */
export const jwt =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlzM2lzZDlwMmFpczM0MDFpIiwidXNlcm5hbWUiOiJmYXJhbW9femF5dyIsImV4cCI6MTUxMjYyMzkwMjIyfQ.3krY_bxzFwlzNalL2GTT53Bjah2VPFptJnvW3sJJ7jA";

export const loginMocks = [
	{
		request: {
			query: LoginDocument,
			variables: { data },
		},
		result: {
			data: {
				login: {
					accessToken: jwt,
					refreshToken: "refreshToken",
				},
			},
		},
	},
	{
		request: {
			query: LoginDocument,
			variables: {
				username: "username",
				password: "password1234",
			},
		},
		result: {
			errors: [new GraphQLError("Something went wrong!")],
		},
	},
];

export const meMocks = {
	request: {
		query: MeDocument,
		variables: {},
	},
	result: {
		data: {
			me: {
				id: "90i12a93i129a12kj1a2j",
				username: "faramo_zayw",
				email: "fara@test.mail",
			},
		},
	},
};
