import { createElementWithClass } from '../../../utils/helpers';
import './container.css';

export class Container {
  public static createAppContainer(): HTMLElement {
    return createElementWithClass('div', ['app', 'flex']);
  }

  public static createAppTitle(): HTMLElement {
    const title = createElementWithClass('h1', ['app__title']);
    title.textContent = 'Decision Making Tool';

    return title;
  }
}
