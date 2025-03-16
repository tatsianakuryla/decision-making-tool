import { createElementWithClass } from '../../utils/helpers';
import { optionsStore } from '../..';

export class SaveOptions {
  private _linkToSave: HTMLElement;

  constructor() {
    this._linkToSave = createElementWithClass('a', [
      'app__link-to-save-options',
    ]);
  }

  public get linkToSave(): HTMLElement {
    return this._linkToSave;
  }

  public saveOptions(): void {
    document.body.append(this._linkToSave);
    const dataToSave = JSON.stringify(optionsStore.getOptionsArray, null, 2);
    if (this._linkToSave instanceof HTMLAnchorElement) {
      this._linkToSave.href = URL.createObjectURL(
        new Blob([dataToSave], { type: 'application/json' }),
      );
      this._linkToSave.download = 'options.json';
    }
    this._linkToSave.click();
    document.body.removeChild(this._linkToSave);
  }
}
