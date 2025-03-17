import {
  appContainer,
  canvas,
  decisionPickerComponents,
  pickedOptionInfoElement,
  startWindowComponents,
} from '../../..';
import { createElementWithClass } from '../../../utils/helpers';
import { ButtonsFactory } from '../Buttons/buttons-factory';
import './decision-picker-window.css';

export class DecisionPickerWindow {
  private _components: HTMLElement;

  constructor() {
    this._components = createElementWithClass('div', [
      'app__decision-picker-components',
      'flex',
    ]);

    this._components.append(
      ButtonsFactory.getDecisionPickerSettingsElements(),
      pickedOptionInfoElement,
      canvas,
    );
  }

  public get components(): HTMLElement {
    return this._components;
  }

  public static render(): void {
    appContainer.removeChild(startWindowComponents);
    appContainer.append(decisionPickerComponents);
  }
}
