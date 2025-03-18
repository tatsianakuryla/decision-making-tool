import { createElementWithClass } from '../../../utils/helpers';
import { Modal } from './modal';
import '../buttons/button.css';
import './modals.css';
import { OptionsStorage } from '../../options-storage/options-storage';

export class ValidOptionModal extends Modal {
  private static readonly ERROR_MESSAGE = `Please add at least ${OptionsStorage.MIN_VALID_OPTIONS} valid options. An option is considered valid if its title is not empty and its weight is greater than 0`;
  private _infoText: HTMLElement;

  constructor() {
    super('app__valid-option-modal');

    this._infoText = createElementWithClass('p', ['app__valid-option-text']);

    this._modalContainer.prepend(this._infoText);

    this._infoText.textContent = ValidOptionModal.ERROR_MESSAGE;
  }
}
