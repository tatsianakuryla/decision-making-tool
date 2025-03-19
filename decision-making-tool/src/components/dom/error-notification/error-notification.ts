import { createContainer, createParagraph } from '../../../utils/helpers';
import './error-notification.css';

export class ErrorNotification {
  private static readonly CLOSE_TIMEOUT_MS = 5000;
  private static readonly EMPTY_TEXT = '';

  private _errorNotification: HTMLElement;
  private _errorTextElement: HTMLElement;

  constructor() {
    this._errorNotification = createContainer(['app__error-modal']);
    this._errorTextElement = createParagraph(
      'app__error-text',
      ErrorNotification.EMPTY_TEXT,
    );
    this._errorNotification.append(this._errorTextElement);
  }

  public get errorNotification(): HTMLElement {
    return this._errorNotification;
  }

  public open(text: string): void {
    this._errorNotification.classList.add('show');
    setTimeout(() => {
      this._close();
    }, ErrorNotification.CLOSE_TIMEOUT_MS);
    this._errorTextElement.textContent = text;
  }

  private _close(): void {
    this._errorNotification.classList.remove('show');
  }
}
