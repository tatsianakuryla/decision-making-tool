import { createElementWithClass } from '../../utils/helpers';
import { BaseModal } from './base-modal';

export class AddValidOptionModal extends BaseModal {
  private _textContent: HTMLElement;

  constructor() {
    super('app__valid-option-modal');

    this._textContent = createElementWithClass('p', ['app__valid-option-text']);

    this._modalContainer.prepend(this._textContent);

    this._textContent.textContent =
      'Please add at least 2 valid options. An option is considered valid if its title is not empty and its weight is greater than 0';
  }
}
