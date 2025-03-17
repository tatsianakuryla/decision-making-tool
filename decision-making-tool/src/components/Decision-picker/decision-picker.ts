import {
  canvas,
  canvasCreator,
  errorNotification,
  optionsStorage,
  pickedOptionInfoElement,
} from '../..';
import { type Option } from '../options-storage/options-storage';

type CanvaOptionType = Option & { color: string };

export class DecisionPicker {
  private _options: CanvaOptionType[];
  private _totalOptionsWeight: number;
  private _ctx: CanvasRenderingContext2D;
  private _size: number;
  private _radius: number;
  private _rotationAngle: number = 0;
  private _isSpinning: boolean = false;
  private _duration: number;
  private _usedColors: Set<string> = new Set();

  constructor() {
    this._options = optionsStorage.getOptionsArray
      .filter((option) => option.title.length && +option.weight > 0)
      .map((option) => ({
        ...option,
        color: this._getRandomColor(),
      }));

    this._totalOptionsWeight = this._options.reduce(
      (acc, current) => acc + +current.weight,
      0,
    );

    this._size = canvasCreator.getSize;
    this._radius = this._size / 2;
    this._duration = 15000;

    if (!(canvas instanceof HTMLCanvasElement)) {
      errorNotification.open('Canvas is not available');
      throw new Error('Canvas is not available');
    }

    const context = canvas.getContext('2d');
    if (!context) {
      errorNotification.open('Canvas is not supported');
      throw new Error('Canvas is not supported');
    }

    this._ctx = context;
  }

  public get getDuration(): number {
    return this._duration;
  }

  public get getOptions(): CanvaOptionType[] {
    return this._options;
  }

  public setDuration(value: number): void {
    this._duration = value * 1000;
  }

  public spinWheel(): void {
    if (this._isSpinning) return;

    this._isSpinning = true;
    const startTime = performance.now();
    const startRotationAngle = this._rotationAngle;
    const totalRotation = 360 * (Math.random() * 3 + 3);
    const animate = (currentTime: number): void => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / this._duration, 1);

      this._rotationAngle = startRotationAngle + totalRotation * progress;

      this._ctx.clearRect(0, 0, this._size, this._size);
      this._drawRotatedWheel();
      this._drawPointer();
      this._updatePickedOption();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this._rotationAngle = ((this._rotationAngle % 360) + 360) % 360;
        this._isSpinning = false;
      }
    };

    requestAnimationFrame(animate);
  }

  public updateOptions(): void {
    this._options = optionsStorage.getOptionsArray
      .filter((option) => option.title.length && +option.weight > 0)
      .map((option) => ({
        ...option,
        color: this._getRandomColor(),
      }));

    this._totalOptionsWeight = this._options.reduce(
      (acc, current) => acc + +current.weight,
      0,
    );

    this._drawWheel();
  }

  private _drawWheel(): void {
    this._ctx.clearRect(-this._radius, -this._radius, this._size, this._size);

    let startAngle = 0;
    this._options.forEach((option) => {
      const share = this._getOptionShare(option);
      const angle = share * 2 * Math.PI;
      this._drawSection(
        startAngle,
        startAngle + angle,
        option.color,
        option.title,
      );
      startAngle += angle;
    });

    this._drawCenter();
  }

  private _updatePickedOption(): void {
    if (!this._isSpinning) return;

    let pointerAngle = (((-this._rotationAngle - 90) % 360) + 360) % 360;
    pointerAngle = (pointerAngle * Math.PI) / 180;

    let pickedOption = this._getOptionAtAngle(pointerAngle);

    if (pickedOptionInfoElement.textContent !== pickedOption) {
      pickedOptionInfoElement.textContent = pickedOption;
    }
  }

  private _getOptionAtAngle(angle: number): string {
    let currentAngle = 0;

    for (const option of this._options) {
      const share = this._getOptionShare(option);
      const sectorAngle = share * 2 * Math.PI;

      if (angle >= currentAngle && angle < currentAngle + sectorAngle) {
        return option.title;
      }
      currentAngle += sectorAngle;
    }

    return '';
  }

  private _getOptionShare(options: Option): number {
    return Number(options.weight) / this._totalOptionsWeight;
  }

  private _getRandomColor(): string {
    let color;
    do {
      color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    } while (this._usedColors.has(color));

    this._usedColors.add(color);
    return color;
  }

  private _drawRotatedWheel(): void {
    this._ctx.clearRect(0, 0, this._size, this._size);

    this._ctx.save();

    this._ctx.translate(this._radius, this._radius);
    this._ctx.rotate(this._rotationAngle * (Math.PI / 180));
    this._ctx.translate(-this._radius, -this._radius);

    this._drawWheel();

    this._ctx.restore();

    this._drawPointer();
  }

  private _drawSection(
    startAngle: number,
    endAngle: number,
    color: string,
    title: string,
  ): void {
    this._ctx.beginPath();
    this._ctx.moveTo(this._radius, this._radius);
    this._ctx.arc(
      this._radius,
      this._radius,
      this._radius,
      startAngle,
      endAngle,
    );
    this._ctx.closePath();

    this._ctx.fillStyle = color;
    this._ctx.fill();

    this._ctx.strokeStyle = '#000';
    this._ctx.lineWidth = 2;
    this._ctx.stroke();

    this._drawText(title, startAngle, endAngle);
  }

  private _drawText(title: string, startAngle: number, endAngle: number): void {
    const angle = (startAngle + endAngle) / 2;
    const textRadius = this._radius * 0.6;

    const x = this._radius + Math.cos(angle) * textRadius;
    const y = this._radius + Math.sin(angle) * textRadius;

    this._ctx.save();
    this._ctx.translate(x, y);

    this._ctx.rotate(angle);

    this._ctx.textAlign = 'center';
    this._ctx.textBaseline = 'middle';
    this._ctx.fillStyle = '#fff';

    const maxFontSize = 16;
    let fontSize = maxFontSize;
    this._ctx.font = `bold ${fontSize}px Arial`;

    const maxLength = this._radius * 0.6;

    let textToDisplay = title;
    while (
      this._ctx.measureText(textToDisplay).width > maxLength &&
      textToDisplay.length > 3
    ) {
      textToDisplay = textToDisplay.slice(0, -1);
    }
    if (textToDisplay.length < title.length) {
      textToDisplay += '...';
    }

    this._ctx.fillText(textToDisplay, 0, 0);

    this._ctx.restore();
  }

  private _drawCenter(): void {
    this._ctx.beginPath();
    this._ctx.arc(
      this._radius,
      this._radius,
      this._radius * 0.1,
      0,
      2 * Math.PI,
    );
    this._ctx.fillStyle = '#000';
    this._ctx.fill();
  }

  private _drawPointer(): void {
    const pointerSize = this._radius * 0.1;
    const pointerX = this._radius;
    const pointerY = 2;

    this._ctx.fillStyle = 'red';
    this._ctx.beginPath();
    this._ctx.moveTo(pointerX - pointerSize, pointerY);
    this._ctx.lineTo(pointerX + pointerSize, pointerY);
    this._ctx.lineTo(pointerX, pointerY + pointerSize * 2);
    this._ctx.closePath();
    this._ctx.fill();
  }
}
