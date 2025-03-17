import { createElementWithClass } from '../../../utils/helpers';
import { Modal } from './modal';
import '../Buttons/button.css';
import './modals.css';

export class ValidOptionModal extends Modal {
  private _infoText: HTMLElement;

  constructor() {
    super('app__valid-option-modal');

    this._infoText = createElementWithClass('p', ['app__valid-option-text']);

    this._modalContainer.prepend(this._infoText);

    this._infoText.textContent =
      'Please add at least 2 valid options. An option is considered valid if its title is not empty and its weight is greater than 0';
  }
}
