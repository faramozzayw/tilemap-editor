import { Bulma } from "./bulma";

export const getColorModifiers = ({ isColor: color }: Bulma.Color) => {
	return color ? { [`is-${color}`]: true } : {};
};

export function getSizeModifiers({ isSize: size }: Bulma.Size) {
	return size ? { [`is-${size}`]: true } : {};
}
