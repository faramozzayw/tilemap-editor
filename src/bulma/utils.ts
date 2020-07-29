import { Bulma } from "./bulma";

export function getModifiersCreator<T>(key: string) {
	return (props: { [key: string]: T | undefined }) => {
		const modifier = props[key];

		return modifier ? { [`is-${modifier}`]: true } : {};
	};
}

export const getColorModifiers = getModifiersCreator<Bulma.Colors>("isColor");
export const getAlignmentModifiers = getModifiersCreator<Bulma.Align>(
	"isAlign",
);
export const getSizeModifiers = getModifiersCreator<Bulma.Sizes>("isSize");
export const getStateModifiers = getModifiersCreator<Bulma.States>("isState");

export const getActiveModifiers = ({ isActive }: Bulma.Active) => {
	return isActive ? { [`is-active`]: true } : {};
};

export const getLoadingModifiers = ({ isLoading }: Bulma.Loading) => {
	return isLoading ? { [`is-loading`]: true } : {};
};

export const getHeadingModifiers = ({
	isSize: size = 1,
	isSpaced,
}: Bulma.Heading) => {
	const isSize = { [`is-${size}`]: true };

	return {
		...isSize,
		"is-spaced": isSpaced,
	};
};
