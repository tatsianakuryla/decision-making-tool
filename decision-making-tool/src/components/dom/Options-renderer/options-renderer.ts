import { createElementWithClass } from '../../../utils/helpers';
import { type Option } from '../../Options-storage/options-storage';
import { OptionsItemFactory } from './options-item-factory';
import './options-renderer.css';

export class OptionsRenderer {
  private _optionsList: HTMLElement;

  constructor() {
    this._optionsList = createElementWithClass('ul', [
      'app__options-list',
      'flex',
    ]);
  }

  public get optionsList(): HTMLElement {
    return this._optionsList;
  }

  public renderOptionsList(optionsArray: Option[]): void {
    this.optionsList.replaceChildren();
    optionsArray.forEach((option) =>
      this.optionsList.append(OptionsItemFactory.getItem(option)),
    );
  }

  public renderOption(option: Option): void {
    this.optionsList.append(OptionsItemFactory.getItem(option));
  }
}
