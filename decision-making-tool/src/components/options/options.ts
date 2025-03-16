import { LocalStorage } from '../local-storage/local-storage';
import { idGenerator } from '../..';

export type Option = {
  id: string;
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

  public addEmptyOption(): void {
    this.addOption({ id: '', title: '', weight: '' });
  }

  public addOption(option: Option): void {
    idGenerator.idCounterIncrease();
    option.id = '#' + idGenerator.getIdCounter;
    this._options.push(option);
    LocalStorage.saveToLocalStorage('options', this._options);
  }

  public removeOption(id: string): void {
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
    idGenerator.idCounterReset();
    LocalStorage.saveToLocalStorage('options', this._options);
  }

  public validOptionsQuantity(): number {
    return this._options.reduce((acc: number, option): number => {
      option.title.length > 0 && +option.weight > 0 ? acc++ : acc;
      return acc;
    }, 0);
  }
}
