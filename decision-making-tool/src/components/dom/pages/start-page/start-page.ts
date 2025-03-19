import {
  errorPageContainer,
  optionsRenderer,
  pickerPageContainer,
  startPageContainer,
} from '../../../..';
import { ButtonsFactory } from '../../buttons/buttons-factory';
import { Page } from '../page';
import './start-page.css';

export class StartPage extends Page {
  constructor() {
    super(ButtonsFactory.createStartScreenButtons(), [
      'app__start-window-components',
      'flex',
    ]);
    this._container.prepend(optionsRenderer.optionsList);
  }

  public static override show(): void {
    super.show(
      '/options',
      pickerPageContainer,
      errorPageContainer,
      startPageContainer,
    );
  }
}
