import { decisionPicker, errorNotification } from '../../..';
import { createElementWithClass } from '../../../utils/helpers';

export class DurationInput {
  private _input: HTMLElement;

  constructor() {
    this._input = createElementWithClass('input', ['app__duration-input']);

    if (this._input instanceof HTMLInputElement) {
      this._input.placeholder = 'sec';
      this._input.type = 'number';
      this._input.value = (decisionPicker.getDuration / 1000).toString();
    }

    this._input.addEventListener('change', () => {
      if (this._input instanceof HTMLInputElement) {
        const value = +this._input.value;
        if (value >= 5 && value <= 30) {
          decisionPicker.setDuration(value);
        } else {
          this._input.value = '15';
          errorNotification.open('Duration must be between 5 to 30 seconds');
        }
      }
    });
  }

  public get getInput(): HTMLElement {
    return this._input;
  }
}
