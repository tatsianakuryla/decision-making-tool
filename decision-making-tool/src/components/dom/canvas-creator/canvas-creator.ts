import { createElementWithClass } from '../../../utils/helpers';
import './canvas-creator.css';

export class CanvasCreator {
  public static SIZE: number = 300;
  private _canvas: HTMLElement;

  constructor() {
    this._canvas = createElementWithClass('canvas', ['app__canvas']);
    if (this._canvas instanceof HTMLCanvasElement) {
      this._canvas.width = CanvasCreator.SIZE;
      this._canvas.height = CanvasCreator.SIZE;
      this._canvas.style.width = `${CanvasCreator.SIZE}px`;
      this._canvas.style.height = `${CanvasCreator.SIZE}px`;
    }
  }

  public get canvas(): HTMLElement {
    return this._canvas;
  }
}
