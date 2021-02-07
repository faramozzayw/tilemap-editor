import { userIsOwned } from "./utils";

const rules = {
	visitor: {
		static: ["posts:list", "home-page:visit"],
	},
	user: {
		static: [
			"posts:list",
			"posts:create",
			"users:getSelf",
			"home-page:visit",
			"dashboard-page:visit",
			"like:map",
		],
		dynamic: {
			"user:edit": userIsOwned,
			"map:edit": userIsOwned,
		},
	},
	admin: {
		static: [
			"posts:list",
			"posts:create",
			"posts:edit",
			"posts:delete",
			"users:get",
			"users:getSelf",
			"home-page:visit",
			"dashboard-page:visit",
		],
	},
};

export default rules;
