import { createParagraph } from '../../../utils/helpers';
import './picked-option-info.css';

export class PickedOptionInfo {
  private _info: HTMLElement;

  constructor() {
    this._info = createParagraph('app__picker-info', 'PRESS START BUTTON');
    document.addEventListener('click', (event) => {
      if (event.target instanceof Node && !this._info.contains(event.target)) {
        this._info.classList.remove('selected');
      }
    });
  }

  public get getInfo(): HTMLElement {
    return this._info;
  }

  public updateInfo(info: string): void {
    this._info.textContent = info;
  }
}
