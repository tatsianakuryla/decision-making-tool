import { decisionPicker, errorNotification } from '../../..';
import {
  comaDottKeydownPrevent,
  createElementWithClass,
} from '../../../utils/helpers';
import './duration-input.css';

export class DurationInput {
  private static readonly PLACEHOLDER_TEXT = 'sec';
  private static readonly INPUT_TYPE = 'number';
  private static readonly DEFAULT_DURATION_SEC = 15;
  private static readonly MIN_DURATION_SEC = 5;
  private static readonly MAX_DURATION_SEC = 30;
  private static readonly ERROR_MESSAGE =
    'Duration must be between 5 to 30 seconds';
  private static readonly MS_IN_SEC = 1000;

  private _input: HTMLElement;

  constructor() {
    this._input = createElementWithClass('input', ['app__duration-input']);

    if (this._input instanceof HTMLInputElement) {
      this._input.placeholder = DurationInput.PLACEHOLDER_TEXT;
      this._input.type = DurationInput.INPUT_TYPE;
      this._input.value = (
        decisionPicker.getDuration / DurationInput.MS_IN_SEC
      ).toString();
    }

    this._input.addEventListener('change', () => {
      if (this._input instanceof HTMLInputElement) {
        const value = +this._input.value;
        if (
          value >= DurationInput.MIN_DURATION_SEC &&
          value <= DurationInput.MAX_DURATION_SEC
        ) {
          decisionPicker.setDuration(value);
        } else {
          this._input.value = DurationInput.DEFAULT_DURATION_SEC.toString();
          errorNotification.open(DurationInput.ERROR_MESSAGE);
        }
      }
    });

    comaDottKeydownPrevent(this._input);
  }

  public get getInput(): HTMLElement {
    return this._input;
  }
}
