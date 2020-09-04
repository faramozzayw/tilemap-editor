import React from "react";

import rules from "./rules";

type Predicate = (...arg: any) => boolean;

interface DynamicRules {
	[key: string]: Predicate;
}

type StaticRules = string[];

type Scheme = {
	[key: string]: {
		static: StaticRules;
		dynamic: DynamicRules;
	};
};

const check = (
	rules: Scheme,
	role: string,
	action: string,
	data: any,
): boolean => {
	const permissions = rules[role];
	if (!permissions) {
		return false;
	}

	const staticPermissions = permissions.static;

	if (staticPermissions && staticPermissions.includes(action)) {
		return true;
	}

	const dynamicPermissions = permissions.dynamic;

	if (dynamicPermissions) {
		const permissionCondition = dynamicPermissions[action];
		if (!permissionCondition) {
			return false;
		}

		return permissionCondition(data);
	}

	return false;
};

export interface Can {
	role: string;
	perform: string;
	data?: any;
}

export const Can: React.FC<Can> = ({ role, perform, data, children }) => {
	if (!children) return null;

	const checked = check((rules as unknown) as Scheme, role, perform, data);

	if (checked) return <>{children}</>;

	return null;
};
