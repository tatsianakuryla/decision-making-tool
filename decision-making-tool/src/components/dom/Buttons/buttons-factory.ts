import {
  optionsStorage,
  optionsRenderer,
  durationInputElement,
  decisionPicker,
} from '../../..';
import { createElementWithClass } from '../../../utils/helpers';
import { OptionsImporter } from '../../options-importer/options-importer';
import { OptionsExporter } from '../../options-exporter/options-exporter';
import { ValidOptionModal } from '../modals/valid-option-modal';
import { OptionsPasteModal } from '../modals/options-paste-modal';
import { Button } from './button';
import './buttons-factory.css';
import { StartScreen } from '../start-screen/start-screen';
import { DecisionPickerScreen } from '../decision-picker-screen/decision-picker-screen';

export class ButtonsFactory {
  private static _backButton: HTMLElement;
  private static _soundToggleButton: HTMLElement;
  private static _startPickingButton: HTMLElement;

  public static createStartScreenButtons(): HTMLElement {
    const buttonContainer = createElementWithClass('div', [
      'app__buttons-container',
      'flex',
    ]);

    const addOptionButton = Button.createButton('Add new option');
    const pasteOptionsButton = Button.createButton('Paste list');
    const clearListButton = Button.createButton('Clear list');
    const saveListButton = Button.createButton('Save list to file');
    const loadListButton = Button.createButton('Load list from file');
    const startButton = Button.createButton('Start');

    buttonContainer.append(
      addOptionButton,
      pasteOptionsButton,
      clearListButton,
      saveListButton,
      loadListButton,
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

    saveListButton.addEventListener('click', () => {
      saveOptions.exportToJSON();
    });

    loadListButton.addEventListener('click', () => {
      loadOptions.loadOptions();
    });

    startButton.addEventListener('click', () => {
      if (optionsStorage.countValidOptions() < 2) {
        addValidOptionModal.open();
      } else {
        DecisionPickerScreen.show();
        decisionPicker.updateOptions();
      }
    });

    return buttonContainer;
  }

  public static createDecisionPickerControls(): HTMLElement {
    const container = createElementWithClass('div', [
      'app__buttons-container',
      'app__buttons-container_picking',
      'flex',
    ]);

    this._backButton = Button.createButton('back');
    this._soundToggleButton = Button.createButton('sound');
    this._startPickingButton = Button.createButton('Start');

    container.append(
      this._backButton,
      this._soundToggleButton,
      durationInputElement,
      this._startPickingButton,
    );

    this._backButton.addEventListener('click', () => StartScreen.show());

    this._startPickingButton.addEventListener('click', () => {
      decisionPicker.spinWheel();
    });

    this._soundToggleButton.addEventListener('click', () => {
      this._soundToggleButton.classList.toggle('app__button_sound-off');
    });
    return container;
  }

  public static enableControls(): void {
    if (this._backButton instanceof HTMLButtonElement) {
      this._backButton.disabled = false;
    }

    if (this._soundToggleButton instanceof HTMLButtonElement) {
      this._soundToggleButton.disabled = false;
    }

    if (this._startPickingButton instanceof HTMLButtonElement) {
      this._startPickingButton.disabled = false;
    }

    if (durationInputElement instanceof HTMLInputElement) {
      durationInputElement.readOnly = false;
    }
  }

  public static disableControls(): void {
    if (this._backButton instanceof HTMLButtonElement) {
      this._backButton.disabled = true;
    }

    if (this._soundToggleButton instanceof HTMLButtonElement) {
      this._soundToggleButton.disabled = true;
    }

    if (this._startPickingButton instanceof HTMLButtonElement) {
      this._startPickingButton.disabled = true;
    }

    if (durationInputElement instanceof HTMLInputElement) {
      durationInputElement.readOnly = true;
    }
  }
}
