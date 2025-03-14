import { errorBlock, options, optionsList } from '../..';
import { createElementWithClass } from '../../utils/helpers';
import { type Option } from '../options/options';

export class LoadOptions {
  private _inputToLoad: HTMLElement;
  private _readData: Option[] = [];
  private _isValidOptionData: boolean;

  constructor() {
    this._inputToLoad = createElementWithClass('input', [
      'app__input-to-load-options',
      'hidden',
    ]);

    if (this._inputToLoad instanceof HTMLInputElement) {
      this._inputToLoad.type = 'file';
      this._inputToLoad.accept = '.json';
    }

    this._inputToLoad.addEventListener(
      'change',
      this.readLoadedFile.bind(this),
    );
    this._isValidOptionData = true;
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
      const reader: FileReader = new FileReader();

      reader.onload = (): void => {
        const result = reader.result;
        if (typeof result !== 'string') {
          errorBlock.open('Invalid file content!');
          return;
        }
        try {
          const parsedData = JSON.parse(result);

          if (!this.isValidOptionsData(parsedData)) {
            errorBlock.open('Invalid file format!');
            return;
          }
          if (this._readData.length === 0) {
            errorBlock.open('Options were not found!');
            return;
          }

          this._readData = parsedData;
          options.clearOptionsList();
          this._readData.forEach((object: Option) => {
            options.addOption(object);
          });
          optionsList.renderOptionsList(options.options);
        } catch {
          errorBlock.open('Invalid file format!');
        }
      };

      reader.readAsText(file);
    }
  }

  private isValidOptionsData(data: unknown): data is Option[] {
    this._isValidOptionData =
      Array.isArray(data) &&
      data.every((item) => typeof item === 'object' && item !== null);

    return this._isValidOptionData;
  }
}
