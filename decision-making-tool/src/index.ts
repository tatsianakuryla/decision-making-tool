import { Button } from './components/dom/button';
import { Container } from './components/dom/container';
import { OptionsList } from './components/dom/options-list';
import { Options } from './components/options/options';
import { PasteListModule } from './components/dom/paste-list-module';
import { PasteErrorModule } from './components/dom/paste-error-module';
import './styles/style.css';

const appContainer = Container.createAppContainer();

export const options = new Options();
export const optionsList = new OptionsList();
const pasteListModule = new PasteListModule();
export const pasteErrorModule = new PasteErrorModule();

const optionsListDom = optionsList.optionsList;
const pasteListModuleDom = pasteListModule.pasteListModule;
const pasteErrorModuleDom = pasteErrorModule.pasteErrorModule;

const addOptionButton = Button.createButton('Add new option');
const pasteListButton = Button.createButton('Paste list');
const clearListButton = Button.createButton('Clear list');
const saveListToFileButton = Button.createButton('Save list to file');
const loadListFromFileButton = Button.createButton('Load list from file');
const startButton = Button.createButton('Start');

appContainer.append(
  Container.createAppTitle(),
  optionsListDom,
  addOptionButton,
  pasteListButton,
  clearListButton,
  saveListToFileButton,
  loadListFromFileButton,
  startButton,
  pasteListModuleDom,
  pasteErrorModuleDom,
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

pasteListButton.addEventListener('click', () => {
  pasteListModule.openPasteListModule();
});

document.addEventListener('click', (event) => {
  if (
    !pasteListModuleDom.classList.contains('hidden') &&
    !event.composedPath().includes(pasteListModuleDom) &&
    event.target !== pasteListButton
  ) {
    pasteListModule.closePasteListModule();
  }
});

document.addEventListener('keydown', (event) => {
  if (
    event.key === 'Escape' &&
    !pasteListModuleDom.classList.contains('hidden')
  ) {
    pasteListModule.closePasteListModule();
  }
});
