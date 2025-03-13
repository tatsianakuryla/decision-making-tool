import { errorModal, options, optionsList } from '../..';
import { createElementWithClass } from '../../utils/helpers';
import { type Option } from '../options/options';

export class LoadOptions {
  private _inputToLoad: HTMLElement;
  private _readData: Option[];

  constructor() {
    this._inputToLoad = createElementWithClass('input', [
      'app__input-to-load-options',
      'hidden',
    ]);

    if (this._inputToLoad instanceof HTMLInputElement) {
      this._inputToLoad.type = 'file';
      this._inputToLoad.accept = '.json';
    }

    this._inputToLoad.addEventListener('change', (event) =>
      this.readLoadedFile(event),
    );

    this._readData = [];
  }

  public get inputToLoad(): HTMLElement {
    return this._inputToLoad;
  }

  public loadOptions(): void {
    if (this._inputToLoad instanceof HTMLInputElement) {
      document.body.append(this._inputToLoad);
      this._inputToLoad.value = '';
      this._inputToLoad.click();
    }
  }

  private readLoadedFile(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const target = event.target;

      if (!target.files || target.files.length === 0) return;

      const file = target.files[0];
      const reader = new FileReader();

      reader.onload = (): void => {
        try {
          if (reader instanceof FileReader) {
            const result = reader.result;
            if (typeof result !== 'string') {
              throw new Error('Invalid file content');
            }

            this._readData = JSON.parse(result);

            if (!Array.isArray(this._readData)) {
              errorModal.open('Invalid file format!');
              throw new Error('Invalid file format');
            }

            if (this._readData.length === 0) {
              errorModal.open('Options were not found!');
            }

            options.clearOptionsList();

            this._readData.forEach((object: Option) => {
              options.addOption(object);
            });

            optionsList.renderOptionsList(options.options);
          }
        } catch {
          errorModal.open('Invalid file format!');
        }
      };

      reader.readAsText(file);
    }
  }
}
