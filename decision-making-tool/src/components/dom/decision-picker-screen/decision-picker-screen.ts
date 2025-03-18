import {
  appContainer,
  canvas,
  decisionPicker,
  decisionPickerContainer,
  errorPageContainer,
  pickedOptionInfoElement,
  startWindowContainer,
} from '../../..';
import { createElementWithClass } from '../../../utils/helpers';
import { Router } from '../../router/router';
import { ButtonsFactory } from '../buttons/buttons-factory';
import './decision-picker-screen.css';

export class DecisionPickerScreen {
  private _container: HTMLElement;

  constructor() {
    this._container = createElementWithClass('div', [
      'app__decision-picker-components',
      'flex',
    ]);

    this._container.append(
      ButtonsFactory.createDecisionPickerControls(),
      pickedOptionInfoElement,
      canvas,
    );
  }

  public get container(): HTMLElement {
    return this._container;
  }

  public static show(): void {
    Router.navigateTo('/picker');
    if (appContainer.contains(startWindowContainer)) {
      appContainer.removeChild(startWindowContainer);
    }
    if (appContainer.contains(errorPageContainer)) {
      appContainer.removeChild(errorPageContainer);
    }
    appContainer.append(decisionPickerContainer);
    decisionPicker.initialize();
  }
}
