import { createElementWithClass } from '../../../utils/helpers';

export class CanvasFactory {
  public static getCanvas(): HTMLElement {
    const canvas = createElementWithClass('canvas', ['app__canvas']);

    if (canvas instanceof HTMLCanvasElement) {
      canvas.width = 400;
      canvas.height = 400;
    }

    return canvas;
  }
}
