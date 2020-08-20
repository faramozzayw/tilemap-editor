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
		| "danger"
		| "text";

	export interface Color {
		isColor?: Colors;
	}

	export type Sizes = "small" | "normal" | "medium" | "large";
	export interface Size {
		isSize?: Sizes;
	}

	export interface Tag {
		tag?: keyof React.ReactHTML;
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

	export type Align = "left" | "centered" | "right";

	export interface Alignment {
		isAlign?: Align;
	}

	export interface Active {
		isActive?: boolean;
	}

	export type HeadingSizes =
		| 1
		| "1"
		| 2
		| "2"
		| 3
		| "3"
		| 4
		| "4"
		| 5
		| "5"
		| 6
		| "6";

	export interface Heading {
		isSize?: HeadingSizes;
		isSpaced?: boolean;
	}

	export type States = "hovered" | "focused" | "active";
	export interface State {
		isState?: States;
	}

	export interface FullWidth {
		isFullWidth?: boolean;
	}
}
