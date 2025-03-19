import { appContainer } from '../../..';
import { createElementWithClass } from '../../../utils/helpers';

export abstract class Page {
  protected _container: HTMLElement;

  constructor(buttonsContainer: HTMLElement, classes: string[]) {
    this._container = createElementWithClass('div', classes);
    this._container.append(buttonsContainer);
  }

  public get container(): HTMLElement {
    return this._container;
  }

  public static show(
    route: string,
    elementToHide: HTMLElement,
    elementToHide2: HTMLElement,
    elementToShow: HTMLElement,
  ): void {
    import('../../router/router').then(({ Router }) => {
      Router.navigateTo(route);
    });
    if (appContainer.contains(elementToHide)) {
      appContainer.removeChild(elementToHide);
    }
    if (appContainer.contains(elementToHide2)) {
      appContainer.removeChild(elementToHide2);
    }
    appContainer.append(elementToShow);
  }
}
