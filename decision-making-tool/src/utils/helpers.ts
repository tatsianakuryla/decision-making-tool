export function createElementWithClass(
  tag: string,
  classes?: string[],
): HTMLElement {
  const newElement = document.createElement(tag);

  if (classes?.length) newElement.classList.add(...classes);

  return newElement;
}

export function createParagraph(className: string, text: string): HTMLElement {
  const paragraph = createElementWithClass('p', [className]);
  paragraph.textContent = text;
  return paragraph;
}

export function toggleClassListHidden(
  element: HTMLElement,
  isHidden: boolean,
): void {
  element.classList.toggle('hidden', isHidden);
}
