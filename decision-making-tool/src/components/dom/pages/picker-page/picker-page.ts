import {
  startPageContainer,
  canvas,
  decisionPicker,
  pickerPageContainer,
  errorPageContainer,
  pickedOptionInfoElement,
} from '../../../..';
import { ButtonsFactory } from '../../buttons/buttons-factory';
import { Page } from '../page';
import './picker-page.css';

export class PickerPage extends Page {
  constructor() {
    super(ButtonsFactory.createDecisionPickerControls(), [
      'app__decision-picker-components',
      'flex',
    ]);
    this._container.append(pickedOptionInfoElement, canvas);
  }

  public static override show() {
    super.show(
      '/picker',
      startPageContainer,
      errorPageContainer,
      pickerPageContainer,
    );
    decisionPicker.initialize();
  }
}
