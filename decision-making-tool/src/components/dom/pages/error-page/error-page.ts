import {
  pickerPageContainer,
  errorPageContainer,
  startPageContainer,
} from '../../../..';
import { createParagraph } from '../../../../utils/helpers';
import { ButtonsFactory } from '../../buttons/buttons-factory';
import { Page } from '../page';
import './error-page.css';

export class ErrorPage extends Page {
  private static ERROR_MESSAGE =
    'Incorrect URL, please return to the main page';

  constructor() {
    super(ButtonsFactory.createErrorPageButtons(), ['app__error-page', 'flex']);

    const errorMessage = createParagraph(
      'app__error-message',
      ErrorPage.ERROR_MESSAGE,
    );

    this._container.append(errorMessage);
  }

  public static override show(): void {
    super.show(
      '/error',
      startPageContainer,
      pickerPageContainer,
      errorPageContainer,
    );
  }
}
