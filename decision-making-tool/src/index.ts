import { ContainerFactory } from './components/dom/container-factory/container-factory';
import { OptionsRenderer } from './components/dom/options-renderer/options-renderer';
import { OptionsStorage } from './components/options-storage/options-storage';
import { ErrorNotification } from './components/dom/error-notification/error-notification';
import { IdGenerator } from './components/id-generator/id-generator';
import { StartScreen } from './components/dom/start-screen/start-screen';
import { DecisionPickerScreen } from './components/dom/decision-picker-screen/decision-picker-screen';
import { CanvasCreator } from './components/dom/canvas-creator/canvas-creator';
import { DecisionPicker } from './components/decision-picker/decision-picker';
import { PickedOptionInfo } from './components/dom/picked-option-info/picked-option-info';
import { DurationInput } from './components/dom/duration-input/duration-input';
import './styles/modern-normalize.css';
import './styles/style.css';
import { Router } from './components/router/router';
import { ErrorPage } from './components/dom/error-page/error-page';

export const appContainer = ContainerFactory.createAppContainer();

export const canvasCreator = new CanvasCreator();
export const canvas = canvasCreator.getCanvas;
export const optionsStorage = new OptionsStorage();
export const decisionPicker = new DecisionPicker();

export const durationInput = new DurationInput();
export const durationInputElement = durationInput.getInput;
export const pickedOptionInfo = new PickedOptionInfo();
export const pickedOptionInfoElement = pickedOptionInfo.getInfo;
export const decisionPickerScreen = new DecisionPickerScreen();
export const decisionPickerContainer = decisionPickerScreen.container;

export const optionsRenderer = new OptionsRenderer();
export const errorNotification = new ErrorNotification();
export const idGenerator = new IdGenerator();

export const startWindow = new StartScreen();
export const startWindowContainer = startWindow.container;

export const errorPage = new ErrorPage();
export const errorPageContainer = errorPage.container;

appContainer.append(errorNotification.getErrorNotification);

document.body.append(appContainer);

Router.addRoute('/', () => {
  StartScreen.show();
});

Router.addRoute('/options', () => {
  StartScreen.show();
});

Router.addRoute('/picker', () => {
  DecisionPickerScreen.show();
});

Router.init();
optionsStorage.initialize();
optionsRenderer.renderOptionsList(optionsStorage.getOptionsArray);
