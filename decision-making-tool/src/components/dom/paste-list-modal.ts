import { createElementWithIdClass } from '../../utils/helpers';
import { createParagraph, toggleClassListHidden } from '../../utils/helpers';
import { type Option } from '../options/options';
import { options, optionsList, errorModal } from '../..';
import { Button } from './button';

export class PasteListModal {
  private _pasteListModal: HTMLElement;
  private _pasteListText: HTMLElement;
  private _pasteListPlaceholder: HTMLElement;

  constructor() {
    this._pasteListModal = createElementWithIdClass(
      'div',
      'app__paste-list-modal',
      ['app__paste-list-modal', 'hidden'],
    );

    this._pasteListText = createElementWithIdClass(
      'textarea',
      'app__paste-list-textarea',
      ['app__paste-list-textarea'],
    );

    this._pasteListPlaceholder = createElementWithIdClass(
      'div',
      'app__paste-list-placeholder',
      ['app__paste-list-placeholder'],
    );

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

    const confirmButton = Button.createButton('Confirm');
    const cancelButton = Button.createButton('Cancel');

    this._pasteListModal.append(
      this._pasteListText,
      this._pasteListPlaceholder,
      confirmButton,
      cancelButton,
    );

    this._pasteListText.addEventListener('input', () => {
      if (this._pasteListText instanceof HTMLTextAreaElement) {
        toggleClassListHidden(
          this._pasteListPlaceholder,
          this._pasteListText.value.length > 0,
        );
      }
    });

    cancelButton.addEventListener('click', () => {
      this.closePasteListModal();
    });

    confirmButton.addEventListener('click', () => {
      this.getPasteListTextValue();
      this.closePasteListModal();
    });
  }

  public get pasteListModal(): HTMLElement {
    return this._pasteListModal;
  }

  public openPasteListModal(): void {
    toggleClassListHidden(this._pasteListModal, false);
  }

  public closePasteListModal(): void {
    toggleClassListHidden(this._pasteListModal, true);
    toggleClassListHidden(this._pasteListPlaceholder, false);
    if (this._pasteListText instanceof HTMLTextAreaElement) {
      this._pasteListText.value = '';
    }
  }

  private getPasteListTextValue(): void {
    if (
      this._pasteListText instanceof HTMLTextAreaElement &&
      this._pasteListText.value.trim().length > 0
    ) {
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
        errorModal.openErrorModal(
          'Not all options were added. An option must be formatted strictly in the following way: title, weight: title, weight',
        );
      }
    }
  }
}
