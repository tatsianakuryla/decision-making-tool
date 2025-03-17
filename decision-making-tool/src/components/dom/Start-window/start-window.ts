import {
  appContainer,
  decisionPickerComponents,
  optionsRenderer,
  startWindowComponents,
} from '../../..';
import { createElementWithClass } from '../../../utils/helpers';
import { ButtonsFactory } from '../Buttons/buttons-factory';
import './start-window.css';

export class StartWindow {
  private _components: HTMLElement;

  constructor() {
    this._components = createElementWithClass('div', [
      'app__start-window-components',
      'flex',
    ]);

    this._components.append(
      optionsRenderer.optionsList,
      ButtonsFactory.getStartWindowButtons(),
    );
  }
  public get components(): HTMLElement {
    return this._components;
  }

  public static render(): void {
    appContainer.removeChild(decisionPickerComponents);
    appContainer.append(startWindowComponents);
  }
}
