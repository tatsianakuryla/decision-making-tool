import { createElementWithClass } from '../../utils/helpers';

export class Container {
  public static createAppContainer(): HTMLElement {
    return createElementWithClass('div', ['app']);
  }

  public static createAppTitle(): HTMLElement {
    const title = createElementWithClass('h1', ['app__title']);
    title.textContent = 'Decision Making Tool';

    return title;
  }
}
