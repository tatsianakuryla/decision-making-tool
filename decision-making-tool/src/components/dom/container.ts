import { createElementWithIdClass } from '../../utils/helpers';

export class Container {
  public static createAppContainer(): HTMLElement {
    return createElementWithIdClass('div', 'app', ['app']);
  }

  public static createAppTitle(): HTMLElement {
    const title = createElementWithIdClass('h1', 'app__title', ['app__title']);
    title.textContent = 'Decision Making Tool';

    return title;
  }
}
