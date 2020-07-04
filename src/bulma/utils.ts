import { Bulma } from "./bulma";

export const getColorModifiers = ({ isColor: color }: Bulma.Color) => {
	return color ? { [`is-${color}`]: true } : {};
};
