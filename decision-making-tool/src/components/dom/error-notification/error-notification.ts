import {
  createElementWithClass,
  createParagraph,
} from '../../../utils/helpers';
import './error-notification.css';

export class ErrorNotification {
  private static readonly CLOSE_TIMEOUT_MS = 5000;
  private static readonly EMPTY_TEXT = '';

  private _errorNotification: HTMLElement;

  constructor() {
    this._errorNotification = createElementWithClass('div', [
      'app__error-modal',
    ]);
    this._errorNotification.append(
      createParagraph('app__error-text', ErrorNotification.EMPTY_TEXT),
    );
  }

  public get getErrorNotification(): HTMLElement {
    return this._errorNotification;
  }

  public open(text: string): void {
    this._errorNotification.classList.add('show');
    setTimeout(() => {
      this._close();
    }, ErrorNotification.CLOSE_TIMEOUT_MS);
    this._errorNotification.textContent = text;
  }

  private _close(): void {
    this._errorNotification.classList.remove('show');
  }
}
