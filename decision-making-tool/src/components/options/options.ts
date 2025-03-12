export type Option = {
  id: number;
  title: string;
  weight: string;
};

export class Options {
  constructor(
    private _options: Option[] = [{ id: 1, title: '', weight: '' }],
  ) {}

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

    newOption.id = maxId + 1;
    this._options.push(newOption);
  }

  public removeOption(id: number): void {
    this._options = this._options.filter((option) => option.id !== id);
  }

  public editOption(editedOption: Option): void {
    this._options = this._options.map((option) =>
      option.id === editedOption.id ? { ...option, ...editedOption } : option,
    );
  }

  public clearOptionsList(): void {
    this._options = [];
  }
}
