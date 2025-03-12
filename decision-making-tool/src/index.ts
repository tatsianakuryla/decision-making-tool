import { Button } from './components/dom/button';
import { Container } from './components/dom/container';
import { OptionsList } from './components/dom/options-list';
import { Options } from './components/options/options';

const appContainer = Container.createAppContainer();

const options = new Options();
const optionsList = new OptionsList();

const optionsListDom = optionsList.optionsList;

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
