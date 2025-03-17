import { createElementWithClass } from '../../../utils/helpers';
import './button.css';

export class Button {
  public static createButton(buttonTitle: string): HTMLElement {
    const buttonClass = buttonTitle.split(' ').join('-').toLowerCase();
    const button = createElementWithClass('button', [
      'app__button',
      `app__button_${buttonClass}`,
    ]);

    if (
      buttonTitle !== 'Delete' &&
      buttonTitle !== 'back' &&
      buttonTitle !== 'sound'
    ) {
      button.textContent = buttonTitle;
    }

    return button;
  }
}
