import {
  appContainer,
  decisionPickerContainer,
  errorPageContainer,
  optionsRenderer,
  startWindowContainer,
} from '../../..';
import { createElementWithClass } from '../../../utils/helpers';
import { Router } from '../../router/router';
import { ButtonsFactory } from '../buttons/buttons-factory';
import './start-screen.css';

export class StartScreen {
  private _components: HTMLElement;

  constructor() {
    this._components = createElementWithClass('div', [
      'app__start-window-components',
      'flex',
    ]);

    this._components.append(
      optionsRenderer.optionsList,
      ButtonsFactory.createStartScreenButtons(),
    );
  }
  public get container(): HTMLElement {
    return this._components;
  }

  public static show(): void {
    Router.navigateTo('/options');
    if (appContainer.contains(decisionPickerContainer)) {
      appContainer.removeChild(decisionPickerContainer);
    }
    if (appContainer.contains(errorPageContainer)) {
      appContainer.removeChild(errorPageContainer);
    }
    appContainer.append(startWindowContainer);
  }
}
