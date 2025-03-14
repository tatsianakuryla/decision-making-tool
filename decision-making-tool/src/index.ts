import { Button } from './components/dom/button';
import { Container } from './components/dom/container';
import { OptionsList } from './components/dom/options-list';
import { Options } from './components/options/options';
import { PasteListModal } from './components/modals/paste-list-modal';
import { ErrorBlock } from './components/dom/error-block';
import './styles/style.css';
import { SaveOptions } from './components/link-to-save-options/link-to-save-options';
import { LoadOptions } from './components/input-to-load-options/input-to-load-options';
import { AddValidOptionModal } from './components/modals/add-valid-option-modal';

export const appContainer = Container.createAppContainer();

export const options = new Options();
export const optionsList = new OptionsList();
const pasteListModal = new PasteListModal();
export const errorBlock = new ErrorBlock();
const saveOptions = new SaveOptions();
const loadOptions = new LoadOptions();
const addValidOptionModal = new AddValidOptionModal();

const optionsListDom = optionsList.optionsList;
const errorBlockDom = errorBlock.errorBlock;

const addOptionButton = Button.createButton('Add new option');
const pasteOptionsButton = Button.createButton('Paste list');
const clearListButton = Button.createButton('Clear list');
const saveListToFileButton = Button.createButton('Save list to file');
const loadListFromFileButton = Button.createButton('Load list from file');
const startButton = Button.createButton('Start');

appContainer.append(
  Container.createAppTitle(),
  optionsListDom,
  addOptionButton,
  pasteOptionsButton,
  clearListButton,
  saveListToFileButton,
  loadListFromFileButton,
  startButton,
  errorBlockDom,
);

document.body.append(appContainer);
optionsList.renderOptionsList(options.options);

clearListButton.addEventListener('click', () => {
  options.clearOptionsList();
  optionsList.renderOptionsList(options.options);
});

addOptionButton.addEventListener('click', () => {
  options.addOption();
  optionsList.renderOptionsList(options.options);
});

pasteOptionsButton.addEventListener('click', () => {
  pasteListModal.open();
});

saveListToFileButton.addEventListener('click', () => {
  saveOptions.saveOptions();
});

loadListFromFileButton.addEventListener('click', () => {
  loadOptions.loadOptions();
});

startButton.addEventListener('click', () => {
  if (options.validOptionsQuantity() < 1) {
    addValidOptionModal.open();
  }
});
