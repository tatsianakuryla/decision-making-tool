import { createElementWithClass } from '../../../utils/helpers';

export class CanvasCreator {
  private _canvas: HTMLElement;
  private _size: number = 300;

  constructor() {
    this._canvas = createElementWithClass('canvas', ['app__canvas']);
    if (this._canvas instanceof HTMLCanvasElement) {
      this._canvas.width = this._size;
      this._canvas.height = this._size;
      this._canvas.style.width = `${this._size}px`;
      this._canvas.style.height = `${this._size}px`;
    }
  }

  public get getCanvas(): HTMLElement {
    return this._canvas;
  }

  public get getSize(): number {
    return this._size;
  }
}
