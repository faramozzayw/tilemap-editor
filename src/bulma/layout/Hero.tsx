import React, { createElement } from "react";
//import classnames from "classnames";

import { Bulma } from "./../bulma";

export interface Hero extends Bulma.Size, Bulma.Tag, Bulma.Color {
  isBold?: boolean;
  isFullHeight?: boolean;
  isHalfHeight?: boolean;
}

const Hero: React.FC<Hero> = ({ tag = "section", ...props }): any => {
  return createElement(tag, { ...props });
};

export default Hero;
