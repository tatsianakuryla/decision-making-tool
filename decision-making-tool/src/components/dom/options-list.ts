import { createElementWithIdClass } from '../../utils/helpers';
import { type Option } from '../options/options';

export class OptionsList {
  private _optionsList: HTMLElement;

  constructor() {
    this._optionsList = createElementWithIdClass('ul', 'app__options-list', [
      'app__options-list',
    ]);
  }

  public get optionsList(): HTMLElement {
    return this._optionsList;
  }

  public renderOptionsList(options: Option[]): void {
    this.optionsList.replaceChildren();
    options.forEach((option) =>
      this.optionsList.append(this.createOptionsItem(option)),
    );
  }

  private createOptionsItem(element: Option): HTMLElement {
    const option = createElementWithIdClass('li', '', ['app__option']);
    option.dataset.id = element.id.toString();

    const optionId = createElementWithIdClass('div', '', ['app__option-id']);
    optionId.textContent = 'ID: ' + element.id.toString();
    option.append(optionId);

    const optionTitle = createElementWithIdClass('input', '', [
      'app__option-title',
    ]);

    if (optionTitle instanceof HTMLInputElement) {
      optionTitle.type = 'text';
      optionTitle.value = element.title;
      optionTitle.placeholder = 'Title';
      option.append(optionTitle);
    }

    const optionWeight = createElementWithIdClass('input', '', [
      'app__option-weight',
    ]);

    if (optionWeight instanceof HTMLInputElement) {
      optionWeight.type = 'number';
      optionWeight.value = element.weight;
      optionWeight.placeholder = 'Weight';
      option.append(optionWeight);
    }

    if (this.optionsList) {
      this.optionsList.classList.contains('app__options-list');
    }

    return option;
  }
}
