import { createElementWithClass } from '../../../utils/helpers';
import './container-factory.css';

export class ContainerFactory {
  public static createAppContainer(): HTMLElement {
    const container = createElementWithClass('div', ['app', 'flex']);
    container.append(this.createAppTitle());
    return container;
  }

  public static createAppTitle(): HTMLElement {
    const title = createElementWithClass('h1', ['app__title']);
    title.textContent = 'Decision Making Tool';

    return title;
  }
}
