import { LocalStorage } from '../Local-storage/local-storage';
import { idGenerator } from '../..';

export type Option = {
  id: string;
  title: string;
  weight: string;
};

export class OptionsStorage {
  private _optionsArray: Option[];

  constructor() {
    this._optionsArray = LocalStorage.getOptions('options');
  }

  public get getOptionsArray(): Option[] {
    return this._optionsArray;
  }

  public addEmptyOption(): Option {
    return this.createOption('', '');
  }

  public createOption(title: string, weight: string): Option {
    idGenerator.idCounterIncrease();
    const option = {
      id: '#' + idGenerator.getIdCounter,
      title: title,
      weight: weight,
    };
    this.addOption(option);
    return option;
  }

  public addOption(option: Option): void {
    this._optionsArray.push(option);
    this._saveToLocalStorage();
  }

  public removeOption(id: string): void {
    this._optionsArray = this._optionsArray.filter(
      (option) => option.id !== id,
    );
    if (this._optionsArray.length === 0) {
      idGenerator.idCounterReset();
    }
    this._saveToLocalStorage();
  }

  public updateOption(editedOption: Partial<Option>): void {
    this._optionsArray = this._optionsArray.map((option) =>
      option.id === editedOption.id ? { ...option, ...editedOption } : option,
    );
    this._saveToLocalStorage();
  }

  public clear(): void {
    this._optionsArray = [];
    idGenerator.idCounterReset();
    this._saveToLocalStorage();
  }

  public countValidOptions(): number {
    return this._optionsArray.reduce((acc: number, option): number => {
      option.title.length > 0 && +option.weight > 0 ? acc++ : acc;
      return acc;
    }, 0);
  }

  public initialize(): void {
    if (this._optionsArray.length < 1) {
      idGenerator.idCounterReset();
      this.addEmptyOption();
    }
  }

  private _saveToLocalStorage(): void {
    LocalStorage.saveOptions('options', this._optionsArray);
  }
}
