import {
  appContainer,
  decisionPickerComponents,
  startWindowComponents,
} from '../../..';
import {
  createElementWithClass,
  createParagraph,
} from '../../../utils/helpers';
import { ButtonsFactory } from '../Buttons/buttons-factory';
import { CanvasFactory } from '../Canvas-factory/canvas-factory';
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
      createParagraph('app__picker-input', 'PRESS START BUTTON'),
      CanvasFactory.getCanvas(),
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
