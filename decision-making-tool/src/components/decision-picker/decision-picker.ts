import {
  canvas,
  errorNotification,
  optionsStorage,
  pickedOptionInfo,
  pickedOptionInfoElement,
} from '../..';
import { ButtonsFactory } from '../dom/buttons/buttons-factory';
import { CanvasCreator } from '../dom/canvas-creator/canvas-creator';
import { PickedOptionInfo } from '../dom/picked-option-info/picked-option-info';
import { LocalStorage } from '../local-storage/local-storage';
import { type Option } from '../options-storage/options-storage';

type CanvaOptionType = Option & { color: string };

export class DecisionPicker {
  private static readonly WHEEL_RADIUS_FACTOR = 0.95;
  private static readonly DEFAULT_DURATION_MS = 15000;
  private static readonly FULL_CIRCLE_DEGREES = 360;
  private static readonly POINTER_ANGLE_OFFSET = 90;
  private static readonly TEXT_RADIUS_FACTOR = 0.6;
  private static readonly CENTER_CIRCLE_RADIUS_FACTOR = 0.1;
  private static readonly POINTER_SIZE_FACTOR = 0.1;
  private static readonly MAX_FONT_SIZE = 14;
  private static readonly COLOR_SATURATION = 70;
  private static readonly COLOR_LIGHTNESS = 60;
  private static readonly MIN_SPIN_TURNS = 3;
  private static readonly MAX_SPIN_TURNS = 6;
  private static readonly CENTER_CIRCLE_COLOR = '#000';
  private static readonly POINTER_COLOR = '#ff0000';
  private static readonly TEXT_COLOR = '#fff';
  private static readonly SECTION_BORDER_WIDTH = 2;
  private static readonly FONT_FAMILY = 'Nunito, Arial, sans-serif';
  private static readonly CENTER_CIRCLE_OUTLINE_COLOR = '#fff';
  private static readonly CENTER_CIRCLE_OUTLINE_WIDTH = 3;
  private static readonly POINTER_OUTLINE_COLOR = '#000';
  private static readonly POINTER_OUTLINE_WIDTH = 3;
  private static readonly MIN_SECTION_ANGLE_DEG = 10;
  private static readonly TEXT_STROKE_WIDTH = 2;
  private static readonly ELLIPSIS = '...';

  public isSelectedSoundOn: boolean;

  private _options: CanvaOptionType[];
  private _totalOptionsWeight: number;
  private _ctx: CanvasRenderingContext2D;
  private _size: number;
  private _radius: number;
  private _rotationAngle: number = 0;
  private _isSpinning: boolean = false;
  private _duration: number;
  private _usedColors: Set<string> = new Set();
  private _selectSound: HTMLAudioElement;

  constructor() {
    this._options = [];

    this._totalOptionsWeight = 0;

    this._size = CanvasCreator.SIZE;
    this._radius = (this._size / 2) * DecisionPicker.WHEEL_RADIUS_FACTOR;
    this._duration = DecisionPicker.DEFAULT_DURATION_MS;

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
    this._selectSound = new Audio('./assets/audio.mp3');
    this.isSelectedSoundOn = LocalStorage.getSoundState('isSoundOn') ?? true;
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
    ButtonsFactory.disableControls();

    const startTime = performance.now();
    const startRotationAngle = this._rotationAngle;
    const spinTurns =
      Math.random() *
        (DecisionPicker.MAX_SPIN_TURNS - DecisionPicker.MIN_SPIN_TURNS) +
      DecisionPicker.MIN_SPIN_TURNS;
    const totalRotation = DecisionPicker.FULL_CIRCLE_DEGREES * spinTurns;
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
        this._rotationAngle =
          ((this._rotationAngle % DecisionPicker.FULL_CIRCLE_DEGREES) +
            DecisionPicker.FULL_CIRCLE_DEGREES) %
          DecisionPicker.FULL_CIRCLE_DEGREES;
        this._isSpinning = false;
        ButtonsFactory.enableControls();
        if (this.isSelectedSoundOn) {
          this._playSelectSound();
        }
        pickedOptionInfoElement.classList.add('selected');
      }
    };

    requestAnimationFrame(animate);
  }

  public toggleIsSelectedSoundOn(): void {
    this.isSelectedSoundOn = !this.isSelectedSoundOn;
    LocalStorage.saveSoundState('isSoundOn', this.isSelectedSoundOn);
  }

  public initialize(): void {
    this._ctx.clearRect(0, 0, this._size, this._size);
    this._rotationAngle = 0;
    this._options = optionsStorage.optionsArray
      .filter((option) => option.title.length && +option.weight > 0)
      .map((option) => ({
        ...option,
        color: this._getRandomColor(),
      }));
    this._shuffleOptions();
    this._totalOptionsWeight = this._options.reduce(
      (acc, current) => acc + +current.weight,
      0,
    );
    this.isSelectedSoundOn = LocalStorage.getSoundState('isSoundOn') ?? true;

    this._drawWheel();
    this._drawPointer();
    pickedOptionInfo.updateInfo(PickedOptionInfo.DEFAULT_MESSAGE);
  }

  private _playSelectSound(): void {
    this._selectSound.currentTime = 0;
    this._selectSound
      .play()
      .catch((): void => errorNotification.open('Audio play failed'));
  }

  private _shuffleOptions(): void {
    for (let i = this._options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._options[i], this._options[j]] = [
        this._options[j],
        this._options[i],
      ];
    }
  }

  private _drawWheel(): void {
    this._ctx.clearRect(-this._radius, -this._radius, this._size, this._size);

    this._ctx.save();
    this._ctx.translate(
      this._size / 2 - this._radius,
      this._size / 2 - this._radius,
    );
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
    this._ctx.restore();
  }

  private _updatePickedOption(): void {
    if (!this._isSpinning) return;

    let pointerAngle =
      (((-this._rotationAngle - DecisionPicker.POINTER_ANGLE_OFFSET) %
        DecisionPicker.FULL_CIRCLE_DEGREES) +
        DecisionPicker.FULL_CIRCLE_DEGREES) %
      DecisionPicker.FULL_CIRCLE_DEGREES;
    pointerAngle = (pointerAngle * Math.PI) / 180;

    let pickedOption = this._getOptionAtAngle(pointerAngle);
    TextDecoderStream;

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
      color = `hsl(${Math.random() * DecisionPicker.FULL_CIRCLE_DEGREES}, ${DecisionPicker.COLOR_SATURATION}%, ${DecisionPicker.COLOR_LIGHTNESS}%)`;
    } while (
      this._usedColors.has(color) ||
      color === DecisionPicker.POINTER_COLOR ||
      color === DecisionPicker.CENTER_CIRCLE_COLOR ||
      color === DecisionPicker.TEXT_COLOR
    );

    this._usedColors.add(color);
    return color;
  }

  private _drawRotatedWheel(): void {
    this._ctx.clearRect(-this._radius, -this._radius, this._size, this._size);

    this._ctx.save();
    this._ctx.translate(this._size / 2, this._size / 2);
    this._ctx.rotate(this._rotationAngle * (Math.PI / 180));
    this._ctx.translate(-(this._size / 2), -(this._size / 2));

    this._drawWheel();

    this._ctx.restore();
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

    this._ctx.strokeStyle = DecisionPicker.CENTER_CIRCLE_COLOR;
    this._ctx.lineWidth = DecisionPicker.SECTION_BORDER_WIDTH;
    this._ctx.stroke();

    this._drawText(title, startAngle, endAngle);
  }

  private _drawText(title: string, startAngle: number, endAngle: number): void {
    const angle = (startAngle + endAngle) / 2;
    const textRadius = this._radius * DecisionPicker.TEXT_RADIUS_FACTOR;
    const minAngleThreshold =
      (Math.PI / 180) * DecisionPicker.MIN_SECTION_ANGLE_DEG;

    if (endAngle - startAngle < minAngleThreshold) {
      return;
    }

    const x = this._radius + Math.cos(angle) * textRadius;
    const y = this._radius + Math.sin(angle) * textRadius;

    this._ctx.save();
    this._ctx.translate(x, y);
    this._ctx.rotate(angle);

    this._ctx.textAlign = 'center';
    this._ctx.textBaseline = 'middle';

    const maxFontSize = DecisionPicker.MAX_FONT_SIZE;
    this._ctx.font = `bold ${maxFontSize}px ${DecisionPicker.FONT_FAMILY}`;

    const maxLength = this._radius * DecisionPicker.TEXT_RADIUS_FACTOR;

    let textToDisplay = title;
    while (
      this._ctx.measureText(textToDisplay).width > maxLength &&
      textToDisplay.length > DecisionPicker.ELLIPSIS.length
    ) {
      textToDisplay = textToDisplay.slice(0, -1);
    }
    if (textToDisplay.length < title.length) {
      textToDisplay += DecisionPicker.ELLIPSIS;
    }

    this._ctx.fillStyle = DecisionPicker.TEXT_COLOR;
    this._ctx.strokeStyle = DecisionPicker.CENTER_CIRCLE_COLOR;
    this._ctx.lineWidth = DecisionPicker.TEXT_STROKE_WIDTH;

    this._ctx.strokeText(textToDisplay, 0, 0);
    this._ctx.fillText(textToDisplay, 0, 0);

    this._ctx.restore();
  }

  private _drawCenter(): void {
    this._ctx.beginPath();
    this._ctx.arc(
      this._radius,
      this._radius,
      this._radius * DecisionPicker.CENTER_CIRCLE_RADIUS_FACTOR,
      0,
      2 * Math.PI,
    );
    this._ctx.strokeStyle = DecisionPicker.CENTER_CIRCLE_OUTLINE_COLOR;
    this._ctx.lineWidth = DecisionPicker.CENTER_CIRCLE_OUTLINE_WIDTH;
    this._ctx.stroke();

    this._ctx.fillStyle = DecisionPicker.CENTER_CIRCLE_COLOR;
    this._ctx.fill();
  }

  private _drawPointer(): void {
    const pointerSize = this._radius * DecisionPicker.POINTER_SIZE_FACTOR;
    const pointerX = this._radius;
    const pointerY = this._size / 2 - this._radius;

    this._ctx.fillStyle = DecisionPicker.POINTER_COLOR;
    this._ctx.beginPath();
    this._ctx.moveTo(pointerX - pointerSize, pointerY);
    this._ctx.lineTo(pointerX + pointerSize, pointerY);
    this._ctx.lineTo(pointerX, pointerY + pointerSize * 2);
    this._ctx.closePath();

    this._ctx.strokeStyle = DecisionPicker.POINTER_OUTLINE_COLOR;
    this._ctx.lineWidth = DecisionPicker.POINTER_OUTLINE_WIDTH;
    this._ctx.stroke();

    this._ctx.fill();
  }
}
