import { optionsStorage, optionsRenderer } from '../../..';
import { createElementWithClass } from '../../../utils/helpers';
import { OptionsImporter } from '../../Options-importer/options-importer';
import { OptionsExporter } from '../../Options-exporter/options-exporter';
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
    const saveOptions = new OptionsExporter();
    const loadOptions = new OptionsImporter();
    const addValidOptionModal = new AddValidOptionModal();

    clearListButton.addEventListener('click', () => {
      optionsStorage.clear();
      optionsRenderer.renderOptionsList(optionsStorage.getOptionsArray);
    });

    addOptionButton.addEventListener('click', () => {
      optionsRenderer.renderOption(optionsStorage.addEmptyOption());
    });

    pasteOptionsButton.addEventListener('click', () => {
      pasteListModal.open();
    });

    saveListToFileButton.addEventListener('click', () => {
      saveOptions.exportToJSON();
    });

    loadListFromFileButton.addEventListener('click', () => {
      loadOptions.loadOptions();
    });

    startButton.addEventListener('click', () => {
      if (optionsStorage.countValidOptions() < 1) {
        addValidOptionModal.open();
      }
    });

    return buttonContainer;
  }
}
