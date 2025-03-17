import {
  createElementWithClass,
  createParagraph,
} from '../../../utils/helpers';
import './error-notification.css';

export class ErrorNotification {
  private _errorNotification: HTMLElement;

  constructor() {
    this._errorNotification = createElementWithClass('div', [
      'app__error-modal',
    ]);
    this._errorNotification.append(createParagraph('app__error-text', ''));
  }

  public get getErrorNotificationk(): HTMLElement {
    return this._errorNotification;
  }

  public open(text: string): void {
    this._errorNotification.classList.add('show');
    setTimeout(() => {
      this._close();
    }, 3000);
    this._errorNotification.textContent = text;
  }

  private _close(): void {
    this._errorNotification.classList.remove('show');
  }
}
