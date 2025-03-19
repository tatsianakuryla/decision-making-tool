import {
  createContainer,
  createElementWithClass,
} from '../../../utils/helpers';
import { Button } from '../buttons/button';
import { ButtonsFactory } from '../buttons/buttons-factory';

export abstract class Modal {
  protected _modal: HTMLElement;
  protected _modalContainer: HTMLElement;
  protected _isOpen: boolean;
  protected _buttonsContainer: HTMLElement;

  constructor(modalClass: string) {
    this._modal = createElementWithClass('dialog', ['app__modal', modalClass]);
    this._modalContainer = createContainer(['app__modal-container', 'flex']);

    this._buttonsContainer = createContainer(['app__modal-buttons', 'flex']);

    this._isOpen = false;
    this._modalContainer.append(this._buttonsContainer);
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
        document.body.style.overflow = 'hidden';
        this._isOpen = true;
      }
    }
  }

  public close(): void {
    if (this._modal instanceof HTMLDialogElement && this._isOpen) {
      this._modal.close();
      this._modal.remove();
      document.body.style.overflow = '';
      this._isOpen = false;
    }
  }

  protected _createCancelButton(): void {
    const cancelButton = Button.createButton(
      ButtonsFactory.BUTTON_TITLES.CANCEL,
    );
    this._buttonsContainer.append(cancelButton);
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
