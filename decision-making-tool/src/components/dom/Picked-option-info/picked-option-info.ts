import { createParagraph } from '../../../utils/helpers';

export class PickedOptionInfo {
  private _info: HTMLElement;

  constructor() {
    this._info = createParagraph('app__picker-info', 'PRESS START BUTTON');
  }

  public get getInfo(): HTMLElement {
    return this._info;
  }

  public updateInfo(info: string): void {
    this._info.textContent = info;
  }
}
