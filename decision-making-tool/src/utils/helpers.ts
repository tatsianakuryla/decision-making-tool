import { Button } from '../components/dom/buttons/button';

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

export function createContainer(classes: string[]): HTMLElement {
  return createElementWithClass('div', classes);
}

export function createButton(title: string, onClick: () => void): HTMLElement {
  const button = Button.createButton(title);
  button.addEventListener('click', onClick);
  return button;
}

export function comaDottKeydownPrevent(element: HTMLElement): void {
  element.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === '.' || event.key === ',') {
      event.preventDefault();
    }
  });
}

export function disabledElement(
  element: HTMLElement,
  isDisabled: boolean,
): void {
  if (element instanceof HTMLButtonElement) {
    element.disabled = isDisabled;
  }
}
