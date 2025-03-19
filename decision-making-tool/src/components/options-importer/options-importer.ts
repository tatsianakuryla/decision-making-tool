import {
  errorNotification,
  optionsStorage,
  optionsRenderer,
  idGenerator,
} from '../..';
import { createElementWithClass } from '../../utils/helpers';
import { type Option } from '../options-storage/options-storage';

export class OptionsImporter {
  private _fileInput: HTMLElement;
  private _readData: Option[] = [];
  private _isValidOptionData: boolean;

  constructor() {
    this._fileInput = createElementWithClass('input', [
      'app__input-to-load-options',
      'hidden',
    ]);

    if (this._fileInput instanceof HTMLInputElement) {
      this._fileInput.type = 'file';
      this._fileInput.accept = '.json';
    }

    this._fileInput.addEventListener('change', this._readLoadedFile.bind(this));
    this._isValidOptionData = true;
  }

  public get inputToLoad(): HTMLElement {
    return this._fileInput;
  }

  public loadOptions(): void {
    if (this._fileInput instanceof HTMLInputElement) {
      document.body.append(this._fileInput);
      this._fileInput.value = '';
      this._fileInput.click();
    }
  }

  private _readLoadedFile(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const target = event.target;

      if (!target.files || target.files.length === 0) return;

      const file = target.files[0];
      const reader: FileReader = new FileReader();

      reader.onload = (): void => {
        const result = reader.result;
        if (typeof result !== 'string') {
          errorNotification.open('Invalid file content!');
          return;
        }
        try {
          const parsedOptions = JSON.parse(result)?.options;
          const parsedId = JSON.parse(result)?.lastId;

          if (!this._isValidOptionsData(parsedOptions)) {
            errorNotification.open('Invalid file format!');
            return;
          }
          if (parsedOptions.length === 0) {
            errorNotification.open('Options were not found!');
            return;
          }

          this._readData = parsedOptions;
          optionsStorage.clear();
          idGenerator.setIdCounter(parsedId);
          this._readData.forEach((object: Option) => {
            optionsStorage.addOption(object);
          });
          optionsRenderer.renderOptionsList(optionsStorage.optionsArray);
        } catch {
          errorNotification.open('Invalid file format!');
        }
      };

      reader.readAsText(file);
    }
  }

  private _isValidOptionsData(data: unknown): data is Option[] {
    this._isValidOptionData =
      Array.isArray(data) &&
      data.every((item) => typeof item === 'object' && item !== null);

    return this._isValidOptionData;
  }
}
