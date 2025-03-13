import {
  createElementWithIdClass,
  createParagraph,
  toggleClassListHidden,
} from '../../utils/helpers';

export class PasteErrorModal {
  private _pasteErrorModal: HTMLElement;

  constructor() {
    this._pasteErrorModal = createElementWithIdClass(
      'div',
      'app__paste-error-modal',
      ['app__paste-error-modal', 'hidden'],
    );

    this._pasteErrorModal.append(
      createParagraph(
        'app__paste-error-text',
        'Not all options were added. An option must be formatted strictly in the following way: title, weight: title, weight',
      ),
    );
  }

  public get pasteErrorModal(): HTMLElement {
    return this._pasteErrorModal;
  }

  public openPastErrorModal(): void {
    toggleClassListHidden(this._pasteErrorModal, false);
  }

  public closePastErrorModal(): void {
    toggleClassListHidden(this._pasteErrorModal, true);
  }
}
