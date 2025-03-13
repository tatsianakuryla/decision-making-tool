import { errorModal, options, optionsList } from '../..';
import { createElementWithIdClass } from '../../utils/helpers';
import { type Option } from '../options/options';

export class LoadOptions {
  private _inputToLoad: HTMLElement;

  constructor() {
    this._inputToLoad = createElementWithIdClass(
      'input',
      'app__input-to-load-options',
      ['app__input-to-load-options', 'hidden'],
    );

    if (this._inputToLoad instanceof HTMLInputElement) {
      this._inputToLoad.type = 'file';
      this._inputToLoad.accept = '.json';
    }

    this._inputToLoad.addEventListener('change', (event) =>
      this.readLoadedFile(event),
    );
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

      reader.onload = () => {
        try {
          if (reader instanceof FileReader) {
            const result = reader.result;
            if (typeof result !== 'string') {
              throw new Error('Invalid file content');
            }

            const data: Option[] = JSON.parse(result);

            if (!Array.isArray(data)) {
              errorModal.openErrorModal('Invalid file format!');
              throw new Error('Invalid file format');
            }

            if (data.length === 0) {
              errorModal.openErrorModal('Options were not found!');
            }

            options.clearOptionsList();

            data.forEach((object: Option) => {
              options.addOption(object);
            });

            optionsList.renderOptionsList(options.options);
          }
        } catch (error) {
          console.error('Error loading file:', error);
          errorModal.openErrorModal('Invalid file format!');
        }
      };

      reader.readAsText(file);
    }
  }
}
