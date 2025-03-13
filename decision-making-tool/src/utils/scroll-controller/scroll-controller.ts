export class ScrollController {
  private _scrollPosition: number = 0;
  private _isScrollDisabled: boolean = false;

  public disabledScroll(): void {
    if (this._isScrollDisabled) return;

    this._scrollPosition = window.scrollY;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${this._scrollPosition}px`;
    document.body.style.left = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    this._isScrollDisabled = true;
  }

  public enabledScroll(): void {
    if (!this._isScrollDisabled) return;

    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    document.body.style.overflow = '';

    window.scrollTo(0, this._scrollPosition);

    this._isScrollDisabled = false;
  }
}
