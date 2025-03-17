import { ContainerFactory } from './components/dom/Container-factory/container-factory';
import { OptionsRenderer } from './components/dom/Options-renderer/options-renderer';
import { OptionsStorage } from './components/Options-storage/options-storage';
import { ErrorNotification } from './components/dom/Error-notification/error-notification';
import { IdGenerator } from './components/Id-generator/id-generator';
import { StartWindow } from './components/dom/Start-window/start-window';
import './styles/modern-normalize.css';
import './styles/style.css';
import { DecisionPickerWindow } from './components/dom/Decision-picker-window/decision-picker-window';

export const appContainer = ContainerFactory.createAppContainer();
export const optionsStorage = new OptionsStorage();
export const optionsRenderer = new OptionsRenderer();
export const errorNotification = new ErrorNotification();
export const idGenerator = new IdGenerator();

export const startWindow = new StartWindow();
export const startWindowComponents = startWindow.components;

export const decisionPickerWindow = new DecisionPickerWindow();
export const decisionPickerComponents = decisionPickerWindow.components;

appContainer.append(startWindowComponents);
document.body.append(appContainer);
optionsStorage.initialize();
optionsRenderer.renderOptionsList(optionsStorage.getOptionsArray);
