import { createElementWithClass } from '../../utils/helpers';
import { idGenerator, optionsStorage } from '../..';

export class OptionsExporter {
  private static readonly FILE_NAME = 'options.json';
  private _exportLink: HTMLElement;

  constructor() {
    this._exportLink = createElementWithClass('a', [
      'app__link-to-save-options',
    ]);
  }

  public get getExportLink(): HTMLElement {
    return this._exportLink;
  }

  public exportToJSON(): void {
    document.body.append(this._exportLink);
    const dataToSave = JSON.stringify(
      {
        options: optionsStorage.getOptionsArray,
        lastId: idGenerator.getIdCounter,
      },
      null,
      2,
    );
    if (this._exportLink instanceof HTMLAnchorElement) {
      this._exportLink.href = URL.createObjectURL(
        new Blob([dataToSave], { type: 'application/json' }),
      );
      this._exportLink.download = OptionsExporter.FILE_NAME;
    }
    this._exportLink.click();
    document.body.removeChild(this._exportLink);
  }
}
