import { Button } from './components/dom/button';
import { Container } from './components/dom/container';
import { OptionsList } from './components/dom/options-list';
import { Options } from './components/options/options';
import { PasteListModal } from './components/dom/paste-list-modal';
import { ErrorModal } from './components/dom/error-modal';
import './styles/style.css';
import { SaveOptions } from './components/link-to-save-options/link-to-save-options';
import { LoadOptions } from './components/input-to-load-options/input-to-load-options';
import { ScrollController } from './utils/scroll-controller/scroll-controller';

export const appContainer = Container.createAppContainer();

export const options = new Options();
export const optionsList = new OptionsList();
const pasteListModal = new PasteListModal();
export const errorModal = new ErrorModal();
const saveOptions = new SaveOptions();
const loadOptions = new LoadOptions();
export const scrollController = new ScrollController();

const optionsListDom = optionsList.optionsList;
export const pasteListModalDom = pasteListModal.pasteListModal;
const errorModalDom = errorModal.errorModal;

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
  errorModalDom,
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

document.addEventListener('click', (event) => {
  if (
    pasteListModal.isOpen &&
    !event.composedPath().includes(pasteListModalDom) &&
    event.target !== pasteOptionsButton
  ) {
    pasteListModal.close();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !pasteListModal.isOpen) {
    pasteListModal.close();
  }
});
