import { optionsRenderer, optionsStorage } from '../../..';
import {
  comaDottKeydownPrevent,
  createContainer,
  createElementWithClass,
} from '../../../utils/helpers';
import { type Option } from '../../options-storage/options-storage';
import { Button } from '../buttons/button';
import { ButtonsFactory } from '../buttons/buttons-factory';

export class OptionsItemFactory {
  private static readonly ID_PREFIX = 'ID: ';
  private static readonly TITLE_PLACEHOLDER = 'Title';
  private static readonly WEIGHT_PLACEHOLDER = 'Weight';

  public static createItem(element: Option): HTMLElement {
    const optionItem = createElementWithClass('li', ['app__option', 'flex']);
    optionItem.dataset.id = element.id;

    optionItem.append(
      this.createItemId(element),
      this.createItemTitle(element),
      this.createItemWeight(element),
    );
    this.addDeleteButton(optionItem, element);

    return optionItem;
  }

  private static createItemId(element: Option): HTMLElement {
    const optionId = createContainer(['app__option-id']);
    optionId.textContent = OptionsItemFactory.ID_PREFIX + element.id;
    return optionId;
  }

  private static createItemTitle(element: Option): HTMLElement {
    const optionTitle = createElementWithClass('input', ['app__option-title']);
    if (optionTitle instanceof HTMLInputElement) {
      optionTitle.type = 'text';
      optionTitle.value = element.title;
      optionTitle.placeholder = OptionsItemFactory.TITLE_PLACEHOLDER;
      optionTitle.addEventListener('input', () => {
        optionsStorage.updateOption({
          id: element.id,
          title: optionTitle.value,
        });
      });
    }
    return optionTitle;
  }

  private static createItemWeight(element: Option): HTMLElement {
    const optionWeight = createElementWithClass('input', [
      'app__option-weight',
    ]);
    if (optionWeight instanceof HTMLInputElement) {
      optionWeight.type = 'number';
      optionWeight.value = element.weight;
      optionWeight.placeholder = OptionsItemFactory.WEIGHT_PLACEHOLDER;
      optionWeight.addEventListener('input', () => {
        optionsStorage.updateOption({
          id: element.id,
          weight: optionWeight.value,
        });
      });
      comaDottKeydownPrevent(optionWeight);
    }
    return optionWeight;
  }

  private static addDeleteButton(
    optionItem: HTMLElement,
    element: Option,
  ): void {
    const deleteOptionButton = Button.createButton(
      ButtonsFactory.BUTTON_TITLES.DELETE,
    );
    optionItem.append(deleteOptionButton);
    deleteOptionButton.addEventListener('click', () => {
      optionsStorage.removeOption(element.id);
      optionsRenderer.renderOptionsList(optionsStorage.optionsArray);
    });
  }
}
