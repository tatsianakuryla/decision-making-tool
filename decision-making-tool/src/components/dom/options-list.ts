import { createElementWithClass } from '../../utils/helpers';
import { type Option } from '../options/options';
import { options } from '../..';
import { Button } from './button';

export class OptionsList {
  private _optionsList: HTMLElement;
  private _optionItem: HTMLElement;

  constructor() {
    this._optionsList = createElementWithClass('ul', ['app__options-list']);
    this._optionItem = createElementWithClass('li', ['app__option']);
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
    this._optionItem.dataset.id = element.id.toString();

    this.createOptionId(element);
    this.createOptionTitle(element);
    this.createOptionWeight(element);
    this.createDeleteOptionButton(element);

    return this._optionItem;
  }

  private createOptionId(element: Option): void {
    const optionId = createElementWithClass('div', ['app__option-id']);
    optionId.textContent = 'ID: #' + element.id.toString();
    this._optionItem.append(optionId);
  }

  private createOptionTitle(element: Option): void {
    const optionTitle = createElementWithClass('input', ['app__option-title']);

    if (optionTitle instanceof HTMLInputElement) {
      optionTitle.type = 'text';
      optionTitle.value = element.title;
      optionTitle.placeholder = 'Title';
      optionTitle.addEventListener('change', () => {
        options.editOption({ id: element.id, title: optionTitle.value });
      });
    }
    this._optionItem.append(optionTitle);
  }

  private createOptionWeight(element: Option): void {
    const optionWeight = createElementWithClass('input', [
      'app__option-weight',
    ]);

    if (optionWeight instanceof HTMLInputElement) {
      optionWeight.type = 'number';
      optionWeight.value = element.weight.toString();
      optionWeight.placeholder = 'Weight';
      optionWeight.addEventListener('change', () => {
        options.editOption({ id: element.id, weight: optionWeight.value });
      });
    }
    this._optionItem.append(optionWeight);
  }

  private createDeleteOptionButton(element: Option): void {
    const deleteOptionButton = Button.createButton('Delete option');
    deleteOptionButton.addEventListener('click', () => {
      options.removeOption(element.id);
      this.renderOptionsList(options.options);
    });
    this._optionItem.append(deleteOptionButton);
  }
}
