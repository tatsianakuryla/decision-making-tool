import { LocalStorage } from '../local-storage/local-storage';

export class IdGenerator {
  private _idCounter: number;

  constructor() {
    this._idCounter = LocalStorage.getId('idGenerator') ?? 0;
  }

  public get getIdCounter(): number {
    return this._idCounter;
  }

  public setIdCounter(value: number): void {
    this._idCounter = value;
  }

  public idCounterReset(): void {
    this._idCounter = 0;
    this._saveToLocalStorage();
  }

  public idCounterIncrease(): void {
    this._idCounter += 1;
    this._saveToLocalStorage();
  }

  private _saveToLocalStorage(): void {
    LocalStorage.saveId('idGenerator', this._idCounter);
  }
}
