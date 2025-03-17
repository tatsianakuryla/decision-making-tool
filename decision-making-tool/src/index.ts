import { ContainerFactory } from './components/dom/Container-factory/container-factory';
import { OptionsRenderer } from './components/dom/Options-renderer/options-renderer';
import { OptionsStorage } from './components/Options-storage/options-storage';
import { ErrorNotification } from './components/dom/Error-notification/error-notification';
import { IdGenerator } from './components/Id-generator/id-generator';
import { StartWindow } from './components/dom/Start-window/start-window';
import './styles/modern-normalize.css';
import './styles/style.css';
import { DecisionPickerWindow } from './components/dom/Decision-picker-window/decision-picker-window';
import { CanvasCreator } from './components/dom/Canvas-creator/canvas-creator';
import { DecisionPicker } from './components/Decision-picker/decision-picker';
import { PickedOptionInfo } from './components/dom/Decision-picker-window/Picked-option-info/picked-option-info';
import { DurationInput } from './components/dom/Decision-picker-window/Duration-input/Duration-input';

export const appContainer = ContainerFactory.createAppContainer();

export const canvasCreator = new CanvasCreator();
export const canvas = canvasCreator.getCanvas;
export const optionsStorage = new OptionsStorage();
export const decisionPicker = new DecisionPicker();

export const durationInput = new DurationInput();
export const durationInputElement = durationInput.getInput;
export const pickedOptionInfo = new PickedOptionInfo();
export const pickedOptionInfoElement = pickedOptionInfo.getInfo;
export const decisionPickerWindow = new DecisionPickerWindow();
export const decisionPickerComponents = decisionPickerWindow.components;

export const optionsRenderer = new OptionsRenderer();
export const errorNotification = new ErrorNotification();
export const idGenerator = new IdGenerator();

export const startWindow = new StartWindow();
export const startWindowComponents = startWindow.components;

appContainer.append(
  errorNotification.getErrorNotification,
  startWindowComponents,
);
document.body.append(appContainer);
optionsStorage.initialize();
optionsRenderer.renderOptionsList(optionsStorage.getOptionsArray);
