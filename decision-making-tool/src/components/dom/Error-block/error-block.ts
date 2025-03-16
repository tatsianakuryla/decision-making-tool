import {
  createElementWithClass,
  createParagraph,
} from '../../../utils/helpers';
import './error-block.css';

export class ErrorBlock {
  private _errorBlock: HTMLElement;

  constructor() {
    this._errorBlock = createElementWithClass('div', ['app__error-modal']);
    this._errorBlock.append(createParagraph('app__error-text', ''));
  }

  public get errorBlock(): HTMLElement {
    return this._errorBlock;
  }

  public open(text: string): void {
    this._errorBlock.classList.add('show');
    setTimeout(() => {
      this._close();
    }, 3000);
    this._errorBlock.textContent = text;
  }

  private _close(): void {
    this._errorBlock.classList.remove('show');
    this._errorBlock.textContent = 'Error';
  }
}
