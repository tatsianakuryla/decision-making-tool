import { scrollController } from '../..';
import {
  createElementWithClass,
  createParagraph,
  toggleClassListHidden,
} from '../../utils/helpers';

export class ErrorModal {
  private _errorModal: HTMLElement;

  constructor() {
    this._errorModal = createElementWithClass('div', [
      'app__error-modal',
      'hidden',
    ]);
    this._errorModal.append(createParagraph('app__error-text', ''));
  }

  public get errorModal(): HTMLElement {
    return this._errorModal;
  }

  public open(text: string): void {
    toggleClassListHidden(this._errorModal, false);
    this._errorModal.textContent = text;
  }

  public close(): void {
    toggleClassListHidden(this._errorModal, true);
    this._errorModal.textContent = 'Error';
  }
}
