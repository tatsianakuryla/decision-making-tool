import { createElementWithClass } from '../../utils/helpers';
import { type Option } from '../options/options';
import { options, optionsList, errorBlock } from '../..';
import { Button } from '../dom/Buttons/button';
import { BaseModal } from './base-modal';

export class PasteListModal extends BaseModal {
  private _pasteListText: HTMLElement;

  constructor() {
    super('app__paste-list-modal');

    this._pasteListText = createElementWithClass('textarea', [
      'app__paste-list-textarea',
    ]);

    if (this._pasteListText instanceof HTMLTextAreaElement) {
      this._pasteListText.placeholder = `Paste or enter a list of new options in a CSV-like format: title, weight.
Example: Say Hi, 1 => option title: Say Hi, option weight: 1.
Every new option must start from a new line;
Every empty space counts`;
      this._pasteListText.setAttribute('rows', '10');
    }

    this._modalContainer.append(this._pasteListText);

    this._createConfirmButton();
  }

  public override close(): void {
    if (this._pasteListText instanceof HTMLTextAreaElement) {
      this._pasteListText.value = '';
    }
    super.close();
  }

  private _getPasteListTextValue(): void {
    if (this._pasteListText instanceof HTMLTextAreaElement) {
      if (this._pasteListText.value.trim().length > 0) {
        let isAllOptionsAdded = true;
        const strings = this._pasteListText.value.split('\n');
        const optionsArray: Option[] = [];

        strings.forEach((option) => {
          const lastCommaIndex = option.lastIndexOf(',');
          if (!option.includes(',')) {
            isAllOptionsAdded = false;
            return;
          }

          const preWeight = Number.parseInt(
            option.slice(lastCommaIndex + 1).trim(),
          );
          const weight = Number.isFinite(preWeight) ? preWeight : '';
          const title = option.slice(0, lastCommaIndex).trim();
          const regex = /[^\s.,!?;:(){}[\]<>/"'*-]/;

          if (regex.test(title)) {
            optionsArray.push({
              id: 0,
              title: title,
              weight: weight.toString(),
            });
          } else {
            isAllOptionsAdded = false;
          }
        });
        optionsArray.forEach((option) => options.addOption(option));
        optionsList.renderOptionsList(options.options);
        if (!isAllOptionsAdded) {
          errorBlock.open(
            'Not to lose data the option must be formatted strictly in the following way: title, weight: title, weight',
          );
        }
      }
    }
  }

  private _createConfirmButton(): void {
    const confirmButton = Button.createButton('Confirm');
    this._buttonsContainer.append(confirmButton);
    confirmButton.addEventListener('click', () => {
      this._getPasteListTextValue();
      this.close();
    });
  }
}
