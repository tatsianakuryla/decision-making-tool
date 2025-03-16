import { optionsStore, optionsRenderer } from '../../..';
import { createElementWithClass } from '../../../utils/helpers';
import { LoadOptions } from '../../input-to-load-options/input-to-load-options';
import { SaveOptions } from '../../link-to-save-options/link-to-save-options';
import { AddValidOptionModal } from '../../Modals/add-valid-option-modal';
import { PasteListModal } from '../../Modals/paste-list-modal';
import { Button } from './button';
import './buttons-factory.css';

export class ButtonsFactory {
  public static getButtons(): HTMLElement {
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
      optionsStore.clear();
      optionsRenderer.renderOptionsList(optionsStore.getOptionsArray);
    });

    addOptionButton.addEventListener('click', () => {
      optionsStore.addEmptyOption();
      optionsRenderer.renderOption(
        optionsStore.getOptionsArray[optionsStore.getOptionsArray.length - 1],
      );
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
      if (optionsStore.countValidOptions() < 1) {
        addValidOptionModal.open();
      }
    });

    return buttonContainer;
  }
}
