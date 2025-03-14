import { createElementWithClass } from '../../utils/helpers';
import { type Option } from '../options/options';
import { options } from '../..';
import { Button } from './button';

export class OptionsList {
  private _optionsList: HTMLElement;

  constructor() {
    this._optionsList = createElementWithClass('ul', ['app__options-list']);
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
    const optionItem = createElementWithClass('li', ['app__option']);
    optionItem.dataset.id = element.id.toString();

    const optionId = createElementWithClass('div', ['app__option-id']);
    optionId.textContent = 'ID: #' + element.id.toString();

    const optionTitle = createElementWithClass('input', ['app__option-title']);
    if (optionTitle instanceof HTMLInputElement) {
      optionTitle.type = 'text';
      optionTitle.value = element.title;
      optionTitle.placeholder = 'Title';
      optionTitle.addEventListener('input', () => {
        options.editOption({ id: element.id, title: optionTitle.value });
      });
    }

    const optionWeight = createElementWithClass('input', [
      'app__option-weight',
    ]);
    if (optionWeight instanceof HTMLInputElement) {
      optionWeight.type = 'number';
      optionWeight.value = element.weight.toString();
      optionWeight.placeholder = 'Weight';
      optionWeight.addEventListener('input', () => {
        options.editOption({ id: element.id, weight: optionWeight.value });
      });
      optionWeight.addEventListener('keydown', (event) => {
        if (event.key === '.' || event.key === ',') {
          event.preventDefault();
        }
      });
    }

    optionItem.append(optionId, optionTitle, optionWeight);
    this.createDeleteOptionButton(optionItem, element);

    return optionItem;
  }

  private createDeleteOptionButton(
    optionItem: HTMLElement,
    element: Option,
  ): void {
    const deleteOptionButton = Button.createButton('Delete option');
    optionItem.append(deleteOptionButton);
    deleteOptionButton.addEventListener('click', () => {
      options.removeOption(element.id);
      this.renderOptionsList(options.options);
    });
  }
}
