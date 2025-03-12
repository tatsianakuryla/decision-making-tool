export function createElementWithIdClass(
  tag: string,
  id: string = '',
  classes: string[] = [],
): HTMLElement | HTMLInputElement {
  const newElement: HTMLElement = document.createElement(tag);

  if (id.length > 0) {
    newElement.id = id;
  }

  if (classes.length > 0) {
    newElement.classList.add(...classes);
  }

  return newElement;
}
