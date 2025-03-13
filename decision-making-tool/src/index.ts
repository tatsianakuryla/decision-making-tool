import { Button } from './components/dom/button';
import { Container } from './components/dom/container';
import { OptionsList } from './components/dom/options-list';
import { Options } from './components/options/options';
import { PasteListModal } from './components/dom/paste-list-modal';
import { PasteErrorModal } from './components/dom/paste-error-modal';
import './styles/style.css';
import { SaveOptions } from './components/link-to-save-options/link-to-save-options';

const appContainer = Container.createAppContainer();

export const options = new Options();
export const optionsList = new OptionsList();
const pasteListModal = new PasteListModal();
export const pasteErrorModal = new PasteErrorModal();
const saveOptions = new SaveOptions();

const optionsListDom = optionsList.optionsList;
const pasteListModalDom = pasteListModal.pasteListModal;
const pasteErrorModalDom = pasteErrorModal.pasteErrorModal;

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
  pasteListModalDom,
  pasteErrorModalDom,
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
  pasteListModal.openPasteListModal();
});

saveListToFileButton.addEventListener('click', () => {
  saveOptions.saveOptions();
});

document.addEventListener('click', (event) => {
  if (
    !pasteListModalDom.classList.contains('hidden') &&
    !event.composedPath().includes(pasteListModalDom) &&
    event.target !== pasteOptionsButton
  ) {
    pasteListModal.closePasteListModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (
    event.key === 'Escape' &&
    !pasteListModalDom.classList.contains('hidden')
  ) {
    pasteListModal.closePasteListModal();
  }
});
