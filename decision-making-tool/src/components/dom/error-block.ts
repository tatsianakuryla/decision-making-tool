import {
  createElementWithClass,
  createParagraph,
  toggleClassListHidden,
} from '../../utils/helpers';

export class ErrorBlock {
  private _errorBlock: HTMLElement;

  constructor() {
    this._errorBlock = createElementWithClass('div', [
      'app__error-modal',
      'hidden',
    ]);
    this._errorBlock.append(createParagraph('app__error-text', ''));
  }

  public get errorBlock(): HTMLElement {
    return this._errorBlock;
  }

  public open(text: string): void {
    toggleClassListHidden(this._errorBlock, false);
    this._errorBlock.textContent = text;
  }

  public close(): void {
    toggleClassListHidden(this._errorBlock, true);
    this._errorBlock.textContent = 'Error';
  }
}
