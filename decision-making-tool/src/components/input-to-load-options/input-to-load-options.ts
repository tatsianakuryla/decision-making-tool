import { createElementWithIdClass } from '../../utils/helpers';

class LoadOptions {
  private _inputToLoad: HTMLElement;

  constructor() {
    this._inputToLoad = createElementWithIdClass(
      'input',
      'app__input-to-load-options',
      ['app__input-to-load-options', 'hidden'],
    );
  }

  public get inputToLoad(): HTMLElement {
    return this._inputToLoad;
  }

  public loadOptions() {}
}
