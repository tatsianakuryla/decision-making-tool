import { createElementWithIdClass } from '../../utils/helpers';
import { type Option } from '../options/options';
import { options } from '../..';
import { Button } from './button';

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
      optionTitle.addEventListener('change', () => {
        options.editOption({ id: element.id, title: optionTitle.value });
      });
    }

    const optionWeight = createElementWithIdClass('input', '', [
      'app__option-weight',
    ]);

    if (optionWeight instanceof HTMLInputElement) {
      optionWeight.type = 'number';
      optionWeight.value = element.weight.toString();
      optionWeight.placeholder = 'Weight';
      option.append(optionWeight);
      optionWeight.addEventListener('change', () => {
        options.editOption({ id: element.id, weight: optionWeight.value });
      });
    }

    const deleteOptionButton = Button.createButton('Delete option');
    option.append(deleteOptionButton);
    deleteOptionButton.addEventListener('click', () => {
      options.removeOption(element.id);
      this.renderOptionsList(options.options);
    });

    if (this.optionsList) {
      this.optionsList.classList.contains('app__options-list');
    }

    return option;
  }
}
