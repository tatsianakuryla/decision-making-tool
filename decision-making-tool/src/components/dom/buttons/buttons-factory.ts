import {
  optionsStorage,
  optionsRenderer,
  durationInputElement,
  decisionPicker,
} from '../../..';
import {
  createButton,
  createContainer,
  disabledElement,
} from '../../../utils/helpers';
import { OptionsImporter } from '../../options-importer/options-importer';
import { OptionsExporter } from '../../options-exporter/options-exporter';
import { ValidOptionModal } from '../modals/valid-option-modal';
import { OptionsPasteModal } from '../modals/options-paste-modal';
import { StartPage } from '../pages/start-page/start-page';
import { OptionsStorage } from '../../options-storage/options-storage';
import { PickerPage } from '../pages/picker-page/picker-page';
import './buttons-factory.css';

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
    const buttonContainer = createContainer(['app__buttons-container', 'flex']);

    const addOptionButton = createButton(this.BUTTON_TITLES.ADD_OPTION, () => {
      optionsRenderer.renderOption(optionsStorage.addEmptyOption());
    });

    const pasteOptionsButton = createButton(
      this.BUTTON_TITLES.PASTE_LIST,
      () => {
        pasteListModal.open();
      },
    );

    const clearListButton = createButton(this.BUTTON_TITLES.CLEAR_LIST, () => {
      optionsStorage.clear();
      optionsRenderer.renderOptionsList(optionsStorage.optionsArray);
    });

    const saveListButton = createButton(this.BUTTON_TITLES.SAVE_LIST, () => {
      saveOptions.exportToJSON();
    });

    const loadListButton = createButton(this.BUTTON_TITLES.LOAD_LIST, () => {
      loadOptions.loadOptions();
    });

    const startButton = createButton(this.BUTTON_TITLES.START, () => {
      if (
        optionsStorage.countValidOptions() < OptionsStorage.MIN_VALID_OPTIONS
      ) {
        addValidOptionModal.open();
      } else {
        PickerPage.show();
        decisionPicker.initialize();
      }
    });

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

    return buttonContainer;
  }

  public static createDecisionPickerControls(): HTMLElement {
    const container = createContainer([
      'app__buttons-container',
      'app__buttons-container_picking',
      'flex',
    ]);

    this._backButton = createButton(this.BUTTON_TITLES.BACK, () =>
      StartPage.show(),
    );

    this._soundToggleButton = createButton(this.BUTTON_TITLES.SOUND, () => {
      this._soundToggleButton.classList.toggle('app__button_sound-off');
      decisionPicker.toggleIsSelectedSoundOn();
    });

    if (!decisionPicker.isSelectedSoundOn) {
      this._soundToggleButton.classList.add('app__button_sound-off');
    }

    this._startPickingButton = createButton(this.BUTTON_TITLES.START, () => {
      decisionPicker.spinWheel();
    });

    container.append(
      this._backButton,
      this._soundToggleButton,
      durationInputElement,
      this._startPickingButton,
    );

    return container;
  }

  public static createErrorPageButtons(): HTMLElement {
    const container = createContainer([
      'app__buttons-container',
      'app__buttons-error',
    ]);

    const backButton = createButton(this.BUTTON_TITLES.BACK, () =>
      StartPage.show(),
    );
    container.append(backButton);
    return container;
  }

  public static enableControls(): void {
    this.toggleControls(true);
  }

  public static disableControls(): void {
    this.toggleControls(false);
  }

  private static toggleControls(isEnabled: boolean): void {
    disabledElement(this._backButton, !isEnabled);
    disabledElement(this._soundToggleButton, !isEnabled);
    disabledElement(this._startPickingButton, !isEnabled);

    if (durationInputElement instanceof HTMLInputElement) {
      durationInputElement.readOnly = !isEnabled;
    }
  }
}
