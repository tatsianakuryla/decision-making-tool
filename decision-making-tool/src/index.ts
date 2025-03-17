import { ContainerFactory } from './components/dom/Container-factory/container-factory';
import { OptionsRenderer } from './components/dom/Options-renderer/options-renderer';
import { OptionsStorage } from './components/Options-storage/options-storage';
import { ErrorNotification } from './components/dom/Error-notification/error-notification';
import './styles/modern-normalize.css';
import './styles/style.css';
import { ButtonsFactory } from './components/dom/Buttons/buttons-factory';
import { IdGenerator } from './components/Id-generator/id-generator';

export const appContainer = ContainerFactory.createAppContainer();

export const optionsStorage = new OptionsStorage();
export const optionsRenderer = new OptionsRenderer();
export const errorNotification = new ErrorNotification();
export const idGenerator = new IdGenerator();

appContainer.append(
  optionsRenderer.optionsList,
  ButtonsFactory.getButtons(),
  errorNotification.getErrorNotificationk,
);

document.body.append(appContainer);
optionsStorage.initialize();
optionsRenderer.renderOptionsList(optionsStorage.getOptionsArray);
