import { createElementWithClass } from '../../utils/helpers';
import { createParagraph, toggleClassListHidden } from '../../utils/helpers';
import { type Option } from '../options/options';
import { options, optionsList, errorBlock } from '../..';
import { Button } from '../dom/button';

export class PasteListModal {
  private _pasteListModal: HTMLElement;
  private _pasteListText: HTMLElement;
  private _pasteListPlaceholder: HTMLElement;
  private _isOpen: boolean;

  constructor() {
    this._pasteListModal = createElementWithClass('dialog', [
      'app__paste-list-modal',
    ]);
    this._isOpen = false;
    this._pasteListText = createElementWithClass('textarea', [
      'app__paste-list-textarea',
    ]);
    this._pasteListPlaceholder = createElementWithClass('div', [
      'app__paste-list-placeholder',
    ]);
    this._createPlaceholderContent();

    this._pasteListModal.append(
      this._pasteListText,
      this._pasteListPlaceholder,
    );
    document.body.appendChild(this._pasteListModal);
    this._addModalEventListeners();
    this._createModalButtons();
  }

  public get modal(): HTMLElement {
    return this._pasteListModal;
  }

  public get isOpen(): boolean {
    return this._isOpen;
  }

  public open(): void {
    if (!this._isOpen) {
      if (this._pasteListModal instanceof HTMLDialogElement) {
        document.body.prepend(this._pasteListModal);
        this._pasteListModal.showModal();
        this._isOpen = true;
      }
    }
  }

  public close(): void {
    if (this._pasteListText instanceof HTMLTextAreaElement) {
      this._pasteListText.value = '';
    }
    toggleClassListHidden(this._pasteListPlaceholder, false);
    if (this._pasteListModal instanceof HTMLDialogElement && this._isOpen) {
      this._pasteListModal.close();
      this._pasteListModal.remove();
      this._isOpen = false;
    }
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

  private _createModalButtons(): void {
    const confirmButton = Button.createButton('Confirm');
    const cancelButton = Button.createButton('Cancel');

    this._pasteListModal.append(confirmButton, cancelButton);

    cancelButton.addEventListener('click', () => {
      this.close();
    });

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

  private _addModalEventListeners(): void {
    this._pasteListModal.addEventListener('cancel', (event) => {
      event.preventDefault();
      this.close();
      this._isOpen = false;
    });

    this._pasteListModal.addEventListener('click', (event) => {
      if (event.target === this._pasteListModal) {
        this.close();
      }
    });

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
