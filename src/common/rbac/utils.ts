export interface UserIsOwned {
	userId?: string;
	ownerId?: string;
}

export const userIsOwned = ({ userId, ownerId }: UserIsOwned): boolean => {
	if (!userId || !ownerId) return false;

	return userId === ownerId;
};

export interface CanFork extends UserIsOwned {
	isAuth?: boolean;
}

export const canFork = ({ isAuth, userId, ownerId }: CanFork): boolean => {
	if (isAuth) {
		if (!userId || !ownerId) return false;

		return userId !== ownerId;
	}

	return false;
};
