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
		],
		dynamic: {
			"user:edit": ({ userId, ownerId }) => {
				if (!userId || !ownerId) return false;

				return userId === ownerId;
			},
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
