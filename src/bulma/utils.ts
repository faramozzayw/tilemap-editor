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

export const getActiveModifiers = ({ isActive }: Bulma.Active) => {
	return isActive ? { [`is-active`]: true } : {};
};

export const getHeadingModifiers = ({
	isSize: size,
	isSpaced,
}: Bulma.Heading) => {
	const isSize = size ? { [`is-${size}`]: true } : { [`is-1`]: true };

	return {
		...isSize,
		"is-spaced": isSpaced,
	};
};
