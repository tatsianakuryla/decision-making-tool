import {
  createContainer,
  createElementWithClass,
} from '../../../utils/helpers';
import './container-factory.css';

export class ContainerFactory {
  private static readonly APP_TITLE_TEXT = 'Decision Making Tool';

  public static createAppContainer(): HTMLElement {
    const container = createContainer(['app', 'flex']);
    container.append(this.createAppTitle());
    return container;
  }

  public static createAppTitle(): HTMLElement {
    const title = createElementWithClass('h1', ['app__title']);
    title.textContent = ContainerFactory.APP_TITLE_TEXT;

    return title;
  }
}
