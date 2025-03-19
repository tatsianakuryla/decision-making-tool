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
import { StartPage } from '../pages/start-page/start-page';
import { OptionsStorage } from '../../options-storage/options-storage';
import { PickerPage } from '../pages/picker-page/picker-page';

export class ButtonsFactory {
  public static readonly BUTTON_TITLES = {
    ADD_OPTION: 'Add new option',
    PASTE_LIST: 'Paste list',
    CLEAR_LIST: 'Clear list',
    SAVE_LIST: 'Save list to file',
    LOAD_LIST: 'Load list from file',
    START: 'Start',
    BACK: 'back',
    SOUND: 'sound',
    DELETE: 'delete',
    CANCEL: 'Cancel',
    CONFIRM: 'Confirm',
  };

  private static _backButton: HTMLElement;
  private static _soundToggleButton: HTMLElement;
  private static _startPickingButton: HTMLElement;

  public static createStartScreenButtons(): HTMLElement {
    const buttonContainer = createElementWithClass('div', [
      'app__buttons-container',
      'flex',
    ]);

    const addOptionButton = Button.createButton(
      ButtonsFactory.BUTTON_TITLES.ADD_OPTION,
    );
    const pasteOptionsButton = Button.createButton(
      ButtonsFactory.BUTTON_TITLES.PASTE_LIST,
    );
    const clearListButton = Button.createButton(
      ButtonsFactory.BUTTON_TITLES.CLEAR_LIST,
    );
    const saveListButton = Button.createButton(
      ButtonsFactory.BUTTON_TITLES.SAVE_LIST,
    );
    const loadListButton = Button.createButton(
      ButtonsFactory.BUTTON_TITLES.LOAD_LIST,
    );
    const startButton = Button.createButton(ButtonsFactory.BUTTON_TITLES.START);

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
      if (
        optionsStorage.countValidOptions() < OptionsStorage.MIN_VALID_OPTIONS
      ) {
        addValidOptionModal.open();
      } else {
        PickerPage.show();
        decisionPicker.initialize();
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

    this._backButton = Button.createButton(ButtonsFactory.BUTTON_TITLES.BACK);
    this._soundToggleButton = Button.createButton(
      ButtonsFactory.BUTTON_TITLES.SOUND,
    );

    if (!decisionPicker.isSelectedSoundOn) {
      this._soundToggleButton.classList.add('app__button_sound-off');
    }

    this._startPickingButton = Button.createButton(
      ButtonsFactory.BUTTON_TITLES.START,
    );

    container.append(
      this._backButton,
      this._soundToggleButton,
      durationInputElement,
      this._startPickingButton,
    );

    this._backButton.addEventListener('click', () => StartPage.show());

    this._startPickingButton.addEventListener('click', () => {
      decisionPicker.spinWheel();
    });

    this._soundToggleButton.addEventListener('click', () => {
      this._soundToggleButton.classList.toggle('app__button_sound-off');
      decisionPicker.toggleIsSelectedSoundOn();
    });
    return container;
  }

  public static createErrorPageButtons(): HTMLElement {
    const container = createElementWithClass('div', [
      'app__buttons-container',
      'app__buttons-error',
    ]);

    const backButton = Button.createButton(ButtonsFactory.BUTTON_TITLES.BACK);
    backButton.addEventListener('click', () => StartPage.show());
    container.append(backButton);
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
