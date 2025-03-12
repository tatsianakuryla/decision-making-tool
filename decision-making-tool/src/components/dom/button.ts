import { createElementWithIdClass } from '../../utils/helpers';

export class Button {
  public static createButton(buttonTitle: string): HTMLElement {
    const buttonClass = buttonTitle.split(' ').join('-').toLowerCase();
    const button = createElementWithIdClass(
      'button',
      `app__button_${buttonClass}`,
      ['app__button', `app__button_${buttonClass}`],
    );

    button.textContent = buttonTitle;

    return button;
  }
}
