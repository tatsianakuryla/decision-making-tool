import { ContainerFactory } from './components/dom/container-factory/container-factory';
import { OptionsRenderer } from './components/dom/options-renderer/options-renderer';
import { OptionsStorage } from './components/options-storage/options-storage';
import { ErrorNotification } from './components/dom/error-notification/error-notification';
import { IdGenerator } from './components/id-generator/id-generator';
import { StartPage } from './components/dom/pages/start-page/start-page';
import { PickerPage } from './components/dom/pages/picker-page/picker-page';
import { CanvasCreator } from './components/dom/canvas-creator/canvas-creator';
import { DecisionPicker } from './components/decision-picker/decision-picker';
import { PickedOptionInfo } from './components/dom/picked-option-info/picked-option-info';
import { DurationInput } from './components/dom/duration-input/duration-input';
import { Router } from './components/router/router';
import { ErrorPage } from './components/dom/pages/error-page/error-page';
import './styles/modern-normalize.css';
import './styles/style.css';

export const appContainer = ContainerFactory.createAppContainer();

export const canvasCreator = new CanvasCreator();
export const canvas = canvasCreator.getCanvas;

export const optionsStorage = new OptionsStorage();
export const decisionPicker = new DecisionPicker();
export const optionsRenderer = new OptionsRenderer();
export const errorNotification = new ErrorNotification();

export const durationInput = new DurationInput();
export const durationInputElement = durationInput.getInput;

export const pickedOptionInfo = new PickedOptionInfo();
export const pickedOptionInfoElement = pickedOptionInfo.getInfo;

export const startPage = new StartPage();
export const startPageContainer = startPage.container;

export const pickerPage = new PickerPage();
export const pickerPageContainer = pickerPage.container;

export const errorPage = new ErrorPage();
export const errorPageContainer = errorPage.container;

export const idGenerator = new IdGenerator();

appContainer.append(errorNotification.getErrorNotification);

document.body.append(appContainer);

Router.addRoute('/', () => {
  StartPage.show();
});

Router.addRoute('/options', () => {
  StartPage.show();
});

Router.addRoute('/picker', () => {
  PickerPage.show();
});

Router.init();
optionsStorage.initialize();
optionsRenderer.renderOptionsList(optionsStorage.getOptionsArray);
