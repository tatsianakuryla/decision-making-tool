import {
  createElementWithIdClass,
  createParagraph,
  toggleClassListHidden,
} from '../../utils/helpers';

export class PasteErrorModule {
  private _pasteErrorModule: HTMLElement;

  constructor() {
    this._pasteErrorModule = createElementWithIdClass(
      'div',
      'app__paste-error-module',
      ['app__paste-error-module', 'hidden'],
    );

    this._pasteErrorModule.append(
      createParagraph(
        'app__paste-error-text',
        'Not all options were added. An option must be formatted strictly in the following way: title, weight: title, weight',
      ),
    );
  }

  public get pasteErrorModule(): HTMLElement {
    return this._pasteErrorModule;
  }

  public openPastErrorModule(): void {
    toggleClassListHidden(this._pasteErrorModule, false);
  }

  public closePastErrorModule(): void {
    toggleClassListHidden(this._pasteErrorModule, true);
  }
}
