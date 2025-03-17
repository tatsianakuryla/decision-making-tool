import { optionsStorage } from '../..';
import { type Option } from '../Options-storage/options-storage';

export class DecisionPicker {
  private _validOptions: Option[];
  private _totalOptionsWeight: number;

  constructor() {
    this._validOptions = optionsStorage.getOptionsArray.filter(
      (option) => option.title.length && +option.weight > 0,
    );

    this._totalOptionsWeight = this._validOptions.reduce(
      (acc, current) => acc + +current.weight,
      0,
    );
  }

  public get getValidOptions(): Option[] {
    return this._validOptions;
  }

  private _getOptionShare(options: Option): number {
    return +options.weight / this._totalOptionsWeight;
  }

  private _shuffleOptions(): void {
    this._validOptions.sort(() => Math.random() - 0.5);
  }

  private _getRandomColor(): string {
    return `hsl(${Math.random() * 360}, 70%, 60%)`;
  }
}
