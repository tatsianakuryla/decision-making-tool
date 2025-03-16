import { options, optionsList } from '../../..';
import { createElementWithClass } from '../../../utils/helpers';
import { LoadOptions } from '../../input-to-load-options/input-to-load-options';
import { SaveOptions } from '../../link-to-save-options/link-to-save-options';
import { AddValidOptionModal } from '../../modals/add-valid-option-modal';
import { PasteListModal } from '../../modals/paste-list-modal';
import { Button } from './button';
import './buttons-container.css';

export class ButtonContainer {
  public static createButtonsContainer(): HTMLElement {
    const buttonContainer = createElementWithClass('div', [
      'app__buttons-container',
      'flex',
    ]);

    const addOptionButton = Button.createButton('Add new option');
    const pasteOptionsButton = Button.createButton('Paste list');
    const clearListButton = Button.createButton('Clear list');
    const saveListToFileButton = Button.createButton('Save list to file');
    const loadListFromFileButton = Button.createButton('Load list from file');
    const startButton = Button.createButton('Start');

    buttonContainer.append(
      addOptionButton,
      pasteOptionsButton,
      clearListButton,
      saveListToFileButton,
      loadListFromFileButton,
      startButton,
    );

    const pasteListModal = new PasteListModal();
    const saveOptions = new SaveOptions();
    const loadOptions = new LoadOptions();
    const addValidOptionModal = new AddValidOptionModal();

    clearListButton.addEventListener('click', () => {
      options.clearOptionsList();
      optionsList.renderOptionsList(options.options);
    });

    addOptionButton.addEventListener('click', () => {
      options.addOption();
      optionsList.renderOptionsList(options.options);
    });

    pasteOptionsButton.addEventListener('click', () => {
      pasteListModal.open();
    });

    saveListToFileButton.addEventListener('click', () => {
      saveOptions.saveOptions();
    });

    loadListFromFileButton.addEventListener('click', () => {
      loadOptions.loadOptions();
    });

    startButton.addEventListener('click', () => {
      if (options.validOptionsQuantity() < 1) {
        addValidOptionModal.open();
      }
    });

    return buttonContainer;
  }
}
