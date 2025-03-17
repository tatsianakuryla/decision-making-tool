import { optionsRenderer, optionsStorage } from '../../..';
import { createElementWithClass } from '../../../utils/helpers';
import { type Option } from '../../options-storage/options-storage';
import { Button } from '../Buttons/button';

export class OptionsItemFactory {
  public static getItem(element: Option): HTMLElement {
    const optionItem = createElementWithClass('li', ['app__option', 'flex']);
    optionItem.dataset.id = element.id;

    const optionId = createElementWithClass('div', ['app__option-id']);
    optionId.textContent = 'ID: ' + element.id;

    const optionTitle = createElementWithClass('input', ['app__option-title']);
    if (optionTitle instanceof HTMLInputElement) {
      optionTitle.type = 'text';
      optionTitle.value = element.title;
      optionTitle.placeholder = 'Title';
      optionTitle.addEventListener('input', () => {
        optionsStorage.updateOption({
          id: element.id,
          title: optionTitle.value,
        });
      });
    }

    const optionWeight = createElementWithClass('input', [
      'app__option-weight',
    ]);
    if (optionWeight instanceof HTMLInputElement) {
      optionWeight.type = 'number';
      optionWeight.value = element.weight;
      optionWeight.placeholder = 'Weight';
      optionWeight.addEventListener('input', () => {
        optionsStorage.updateOption({
          id: element.id,
          weight: optionWeight.value,
        });
      });
      optionWeight.addEventListener('keydown', (event) => {
        if (event.key === '.' || event.key === ',') {
          event.preventDefault();
        }
      });
    }

    optionItem.append(optionId, optionTitle, optionWeight);
    this.addDeleteButton(optionItem, element);

    return optionItem;
  }

  public static addDeleteButton(
    optionItem: HTMLElement,
    element: Option,
  ): void {
    const deleteOptionButton = Button.createButton('Delete');
    optionItem.append(deleteOptionButton);
    deleteOptionButton.addEventListener('click', () => {
      optionsStorage.removeOption(element.id);
      optionsRenderer.renderOptionsList(optionsStorage.getOptionsArray);
    });
  }
}
