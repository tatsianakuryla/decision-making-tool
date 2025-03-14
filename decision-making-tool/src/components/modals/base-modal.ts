import { createElementWithClass } from '../../utils/helpers';
import { Button } from '../dom/button';

export abstract class BaseModal {
  protected _modal: HTMLElement;
  protected _modalContainer: HTMLElement;
  protected _isOpen: boolean;

  constructor(modalClass: string) {
    this._modal = createElementWithClass('dialog', ['app__modal', modalClass]);
    this._modalContainer = createElementWithClass('div', [
      'app__modal-container',
    ]);
    this._isOpen = false;
    this._modal.append(this._modalContainer);
    this._addModalEventListeners();
    this._createCancelButton();
  }

  public get modal(): HTMLElement {
    return this._modal;
  }

  public get isOpen(): boolean {
    return this._isOpen;
  }

  public open(): void {
    if (!this._isOpen) {
      if (this._modal instanceof HTMLDialogElement) {
        document.body.prepend(this._modal);
        this._modal.showModal();
        this._isOpen = true;
      }
    }
  }

  public close(): void {
    if (this._modal instanceof HTMLDialogElement && this._isOpen) {
      this._modal.close();
      this._modal.remove();
      this._isOpen = false;
    }
  }

  protected _createCancelButton(): void {
    const cancelButton = Button.createButton('Cancel');
    this._modalContainer.append(cancelButton);
    cancelButton.addEventListener('click', () => {
      this.close();
    });
  }

  protected _addModalEventListeners(): void {
    this._modal.addEventListener('cancel', (event) => {
      event.preventDefault();
      this.close();
      this._isOpen = false;
    });

    this._modal.addEventListener('click', (event) => {
      if (event.target === this._modal) {
        this.close();
      }
    });
  }
}
