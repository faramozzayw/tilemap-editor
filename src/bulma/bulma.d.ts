export declare namespace Bulma {
  type Sizes = "small" | "medium" | "large";
  type Colors =
    | "white"
    | "light"
    | "dark"
    | "black"
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "danger";

  interface Size {
    isSize?: Sizes;
  }

  interface Color {
    isColor?: Colors;
  }

  interface Tag {
    tag?: string;
  }
}
