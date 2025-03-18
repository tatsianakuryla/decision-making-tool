import { createElementWithClass } from '../../../utils/helpers';
import './button.css';

export class Button {
  private static readonly BUTTONS_WITH_OUT_TITLES = new Set([
    'delete',
    'back',
    'sound',
  ]);

  public static createButton(buttonTitle: string): HTMLElement {
    const buttonClass = buttonTitle.split(' ').join('-').toLowerCase();
    const button = createElementWithClass('button', [
      'app__button',
      `app__button_${buttonClass}`,
    ]);

    if (!Button.BUTTONS_WITH_OUT_TITLES.has(buttonTitle)) {
      button.textContent = buttonTitle;
    }
    return button;
  }
}
