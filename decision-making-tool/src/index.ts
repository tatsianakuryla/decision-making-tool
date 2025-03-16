import { Container } from './components/dom/Container/container';
import { OptionsList } from './components/dom/Options-list/options-list';
import { Options } from './components/options/options';
import { ErrorBlock } from './components/dom/Error-block/error-block';
import './styles/modern-normalize.css';
import './styles/style.css';
import { ButtonContainer } from './components/dom/Buttons/buttons-container';
import { IdGenerator } from './components/id-generator/id-generator';

export const appContainer = Container.createAppContainer();

export const options = new Options();
export const optionsList = new OptionsList();
export const errorBlock = new ErrorBlock();
export const idGenerator = new IdGenerator();

const optionsListDom = optionsList.optionsList;
const errorBlockDom = errorBlock.errorBlock;
const buttonContainer = ButtonContainer.createButtonsContainer();

appContainer.append(
  Container.createAppTitle(),
  optionsListDom,
  buttonContainer,
  errorBlockDom,
);

document.body.append(appContainer);
optionsList.renderOptionsList(options.options);
