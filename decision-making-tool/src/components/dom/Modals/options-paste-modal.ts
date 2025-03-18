import { createElementWithClass } from '../../../utils/helpers';
import { optionsStorage, optionsRenderer, errorNotification } from '../../..';
import { Button } from '../buttons/button';
import { Modal } from './modal';

export class OptionsPasteModal extends Modal {
  private _textArea: HTMLElement;

  constructor() {
    super('app__paste-list-modal');

    this._textArea = createElementWithClass('textarea', [
      'app__paste-list-textarea',
    ]);

    if (this._textArea instanceof HTMLTextAreaElement) {
      this._textArea.placeholder = `Paste or enter a list of new options in a CSV-like format: title, weight.
Example: Say Hi, 1 => option title: Say Hi, option weight: 1.
Every new option must start from a new line;
Every empty space counts`;
      this._textArea.setAttribute('rows', '10');
    }

    this._modalContainer.append(this._textArea);

    this._createConfirmButton();
  }

  public override close(): void {
    if (this._textArea instanceof HTMLTextAreaElement) {
      this._textArea.value = '';
    }
    super.close();
  }

  private _handleOptionListInput(): void {
    if (this._textArea instanceof HTMLTextAreaElement) {
      if (this._textArea.value.trim().length > 0) {
        let wrongDataFormatError = false;
        const strings = this._textArea.value.split('\n');

        strings.forEach((option) => {
          const lastCommaIndex = option.lastIndexOf(',');
          if (!option.includes(',')) {
            wrongDataFormatError = true;
            return;
          }

          const title = option.slice(0, lastCommaIndex).trim();
          const regex = /[^\s.,!?;:(){}[\]<>/"'*-]/;
          if (!regex.test(title)) {
            wrongDataFormatError = true;
            return;
          }

          const preWeight = option.slice(lastCommaIndex + 1).trim();
          const weight = Number.isFinite(+preWeight) ? preWeight : '';

          optionsRenderer.renderOption(
            optionsStorage.createOption(title, weight.toString()),
          );
        });
        if (wrongDataFormatError) {
          errorNotification.open(
            'Not to lose data the option must be formatted strictly in the following way: title, weight',
          );
        }
      }
    }
  }

  private _createConfirmButton(): void {
    const confirmButton = Button.createButton('Confirm');
    this._buttonsContainer.append(confirmButton);
    confirmButton.addEventListener('click', () => {
      this._handleOptionListInput();
      this.close();
    });
  }
}
