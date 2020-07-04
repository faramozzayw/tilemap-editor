export declare namespace Bulma {
	export type Colors =
		| "white"
		| "light"
		| "dark"
		| "black"
		| "primary"
		| "info"
		| "success"
		| "warning"
		| "danger";

	export interface Color {
		isColor?: Colors;
	}

	export type Sizes = "small" | "normal" | "medium" | "large";
	export interface Size {
		isSize?: Sizes;
	}

	export interface Tag {
		tag?: string;
	}

	export interface Loading {
		isLoading?: boolean;
	}

	export interface Light {
		isLight?: boolean;
	}

	export interface Rounded {
		isRounded?: boolean;
	}
}
