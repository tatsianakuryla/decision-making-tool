import {
  createElementWithIdClass,
  createParagraph,
  toggleClassListHidden,
} from '../../utils/helpers';

export class ErrorModal {
  private _errorModal: HTMLElement;

  constructor() {
    this._errorModal = createElementWithIdClass(
      'div',
      'app__paste-error-modal',
      ['app__paste-error-modal', 'hidden'],
    );
    this._errorModal.append(createParagraph('app__paste-error-text', ''));
  }

  public get pasteErrorModal(): HTMLElement {
    return this._errorModal;
  }

  public openErrorModal(text: string): void {
    toggleClassListHidden(this._errorModal, false);
    this._errorModal.textContent = text;
  }

  public closeErrorModal(): void {
    toggleClassListHidden(this._errorModal, true);
    this._errorModal.textContent = 'Error';
  }
}
