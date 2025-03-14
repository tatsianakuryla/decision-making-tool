import { LocalStorage } from '../local-storage/local-storage';

export type Option = {
  id: number;
  title: string;
  weight: string;
};

export class Options {
  private _options: Option[];

  constructor() {
    this._options = LocalStorage.getFromLocalStorage('options') ?? [
      { id: 1, title: '', weight: '' },
    ];
  }

  public get options(): Option[] {
    return this._options;
  }

  public addOption(option?: Option): void {
    const defaultOption: Option = { id: 0, title: '', weight: '' };

    const newOption = option ? { ...defaultOption, ...option } : defaultOption;

    const maxId = this._options.reduce(
      (accum, current) => Math.max(accum, current.id),
      0,
    );

    newOption.id = newOption.id === 0 ? maxId + 1 : newOption.id;
    this._options.push(newOption);
    LocalStorage.saveToLocalStorage('options', this._options);
  }

  public removeOption(id: number): void {
    this._options = this._options.filter((option) => option.id !== id);
    LocalStorage.saveToLocalStorage('options', this._options);
  }

  public editOption(editedOption: Partial<Option>): void {
    this._options = this._options.map((option) =>
      option.id === editedOption.id ? { ...option, ...editedOption } : option,
    );
    LocalStorage.saveToLocalStorage('options', this._options);
  }

  public clearOptionsList(): void {
    this._options = [];
    LocalStorage.saveToLocalStorage('options', this._options);
  }

  public validOptionsQuantity(): number {
    return this._options.reduce((acc: number, option): number => {
      option.title.length > 0 && +option.weight > 0 ? acc++ : acc;
      return acc;
    }, 0);
  }
}
