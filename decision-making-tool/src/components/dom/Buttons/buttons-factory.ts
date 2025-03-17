import {
  optionsStorage,
  optionsRenderer,
  durationInputElement,
  decisionPicker,
} from '../../..';
import { createElementWithClass } from '../../../utils/helpers';
import { OptionsImporter } from '../../Options-importer/options-importer';
import { OptionsExporter } from '../../Options-exporter/options-exporter';
import { ValidOptionModal } from '../Modals/valid-option-modal';
import { OptionsPasteModal } from '../Modals/options-paste-modal';
import { Button } from './button';
import './buttons-factory.css';
import { StartWindow } from '../Start-window/start-window';
import { DecisionPickerWindow } from '../Decision-picker-window/decision-picker-window';

export class ButtonsFactory {
  public static getStartWindowButtons(): HTMLElement {
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

    const pasteListModal = new OptionsPasteModal();
    const saveOptions = new OptionsExporter();
    const loadOptions = new OptionsImporter();
    const addValidOptionModal = new ValidOptionModal();

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
      if (optionsStorage.countValidOptions() < 2) {
        addValidOptionModal.open();
      } else {
        DecisionPickerWindow.render();
        decisionPicker.updateOptions();
      }
    });

    return buttonContainer;
  }

  public static getDecisionPickerSettingsElements(): HTMLElement {
    const container = createElementWithClass('div', [
      'app__buttons-container',
      'app__buttons-container_picking',
      'flex',
    ]);

    const returnToStartWindowButton = Button.createButton('back');
    const soundButton = Button.createButton('sound');
    const startPickingButton = Button.createButton('Start');

    container.append(
      returnToStartWindowButton,
      soundButton,
      durationInputElement,
      startPickingButton,
    );

    returnToStartWindowButton.addEventListener('click', () =>
      StartWindow.render(),
    );

    startPickingButton.addEventListener('click', () => {
      decisionPicker.spinWheel();
    });

    soundButton.addEventListener('click', () => {
      soundButton.classList.toggle('app__button_sound-off');
    });
    return container;
  }
}
