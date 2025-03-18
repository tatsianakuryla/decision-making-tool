import {
  appContainer,
  decisionPickerContainer,
  errorPageContainer,
  startWindowContainer,
} from '../../..';
import {
  createElementWithClass,
  createParagraph,
} from '../../../utils/helpers';
import { Router } from '../../router/router';
import { ButtonsFactory } from '../buttons/buttons-factory';
import './error-page.css';

export class ErrorPage {
  private static ERROR_MESSAGE =
    'Incorrect URL, please return to the main page';

  private _components: HTMLElement;
  constructor() {
    this._components = createElementWithClass('div', [
      'app__error-page',
      'flex',
    ]);

    const errorMessage = createParagraph(
      'app__error-message',
      ErrorPage.ERROR_MESSAGE,
    );

    this._components.append(
      ButtonsFactory.createErrorPageButtons(),
      errorMessage,
    );
  }
  public get container(): HTMLElement {
    return this._components;
  }

  public static show(): void {
    Router.navigateTo('/error');
    if (appContainer.contains(decisionPickerContainer)) {
      appContainer.removeChild(decisionPickerContainer);
    }

    if (appContainer.contains(startWindowContainer)) {
      appContainer.removeChild(startWindowContainer);
    }
    appContainer.append(errorPageContainer);
  }
}
