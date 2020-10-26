import { LoginDocument, MeDocument } from "../types/graphql";
import { GraphQLError } from "graphql";
import { sign } from "jsonwebtoken";

export const data = {
	username: "faramo_zayw",
	password: "k91231293u129",
	id: "9s3isd9p2ais3401i",
};

export const jwt = sign(
	{
		id: data.id,
		username: data.username,
	},
	"secret",
	{ expiresIn: "5h" },
);

export const loginMocks = [
	{
		request: {
			query: LoginDocument,
			variables: {
				data: {
					username: data.username,
					password: data.password,
				},
			},
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
