import { ContainerFactory } from './components/dom/Container-factory/container-factory';
import { OptionsRenderer } from './components/dom/Options-renderer/options-renderer';
import { OptionsStorage } from './components/OptionsStorage/options-storage';
import { ErrorBlock } from './components/dom/Error-block/error-block';
import './styles/modern-normalize.css';
import './styles/style.css';
import { ButtonsFactory } from './components/dom/Buttons/buttons-factory';
import { IdGenerator } from './components/Id-generator/id-generator';

export const appContainer = ContainerFactory.createAppContainer();

export const optionsStorage = new OptionsStorage();
export const optionsRenderer = new OptionsRenderer();
export const errorBlock = new ErrorBlock();
export const idGenerator = new IdGenerator();

appContainer.append(
  optionsRenderer.optionsList,
  ButtonsFactory.getButtons(),
  errorBlock.errorBlock,
);

document.body.append(appContainer);
optionsStorage.initialize();
optionsRenderer.renderOptionsList(optionsStorage.getOptionsArray);
