import { createParagraph } from '../../../utils/helpers';
import './picked-option-info.css';

export class PickedOptionInfo {
  public static readonly DEFAULT_MESSAGE = 'PRESS START BUTTON';
  private _info: HTMLElement;

  constructor() {
    this._info = createParagraph(
      'app__picker-info',
      PickedOptionInfo.DEFAULT_MESSAGE,
    );
    document.addEventListener('click', (event) => {
      if (event.target instanceof Node && !this._info.contains(event.target)) {
        this._info.classList.remove('selected');
      }
    });
  }

  public get infoElement(): HTMLElement {
    return this._info;
  }

  public updateInfo(info: string): void {
    this._info.textContent = info;
  }
}
