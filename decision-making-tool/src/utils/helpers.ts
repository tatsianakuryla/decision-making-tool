export function createElementWithIdClass(
  tag: string,
  id: string = '',
  classes: string[] = [],
): HTMLElement {
  const newElement: HTMLElement = document.createElement(tag);

  if (id.length > 0) {
    newElement.id = id;
  }

  if (classes.length > 0) {
    newElement.classList.add(...classes);
  }

  return newElement;
}

export function createParagraph(className: string, text: string): HTMLElement {
  const paragraph = createElementWithIdClass('p', className, [className]);
  paragraph.textContent = text;
  return paragraph;
}

export function toggleClassListHidden(
  element: HTMLElement,
  isShown: boolean,
): void {
  element.classList.toggle('hidden', isShown);
}
