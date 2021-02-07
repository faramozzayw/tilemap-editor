export type MapID = string;
export interface MapSize {
	row: number;
	column: number;
}

export interface User {
	username: string;
	id?: string;
	email?: string;
	image?: string;
	description?: string | null;
	[key: string]: any;
}

export interface Tokens {
	access_token: string;
	refresh_token?: string;
	expires_in: number;
}

export interface Claims {
	readonly exp: number;
	readonly id: string;
	readonly username: string;
}

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
