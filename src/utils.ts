export const $ = (selector: string): Node[] => {
  let elements = document.querySelectorAll(selector);
  return Array.prototype.slice.call(elements);
};
