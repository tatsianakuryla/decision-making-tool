export class IdGenerator {
  private _idCounter: number = 0;

  public get getIdCounter(): number {
    return this._idCounter;
  }

  public idCounterReset(): void {
    this._idCounter = 0;
  }

  public idCounterIncrease(): void {
    this._idCounter++;
  }
}
