import { createElementWithClass } from '../../utils/helpers';
import { createParagraph, toggleClassListHidden } from '../../utils/helpers';
import { type Option } from '../options/options';
import { options, optionsList, errorBlock } from '../..';
import { Button } from '../dom/button';
import { BaseModal } from './base-modal';

export class PasteListModal extends BaseModal {
  private _pasteListText: HTMLElement;
  private _pasteListPlaceholder: HTMLElement;

  constructor() {
    super('app__paste-list-modal');

    this._pasteListText = createElementWithClass('textarea', [
      'app__paste-list-textarea',
    ]);

    this._pasteListPlaceholder = createElementWithClass('div', [
      'app__paste-list-placeholder',
    ]);
    this._createPlaceholderContent();

    this._modalContainer.append(
      this._pasteListText,
      this._pasteListPlaceholder,
    );

    this._addTextEventListener();
    this._createConfirmButton();
  }

  public override close(): void {
    if (this._pasteListText instanceof HTMLTextAreaElement) {
      this._pasteListText.value = '';
    }
    toggleClassListHidden(this._pasteListPlaceholder, false);
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
    this._modalContainer.append(confirmButton);
    confirmButton.addEventListener('click', () => {
      this._getPasteListTextValue();
      this.close();
    });
  }

  private _createPlaceholderContent(): void {
    const pasteListInfo = createParagraph(
      'app__paste-list-info',
      'Paste or enter a list of new options in a CSV-like format:',
    );

    const pasteListExample = createParagraph(
      'app__paste-list-example',
      'Example: Say Hi, 1 => option title: Say Hi, option weight: 1',
    );

    const pasteListRules = createParagraph(
      'app__paste-list-rules',
      `
      Every new option must start from a new line;
      Every empty space counts;
    `,
    );
    pasteListRules.style.whiteSpace = 'pre';

    this._pasteListPlaceholder.append(
      pasteListInfo,
      pasteListExample,
      pasteListRules,
    );
  }

  private _addTextEventListener(): void {
    this._pasteListText.addEventListener('input', () => {
      if (this._pasteListText instanceof HTMLTextAreaElement) {
        toggleClassListHidden(
          this._pasteListPlaceholder,
          this._pasteListText.value.length > 0,
        );
      }
    });
  }
}
