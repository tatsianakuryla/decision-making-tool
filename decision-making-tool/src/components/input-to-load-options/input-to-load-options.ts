// import { createElementWithIdClass } from '../../utils/helpers';

// class LoadOptions {
//   private _inputToLoad: HTMLElement;

//   constructor() {
//     this._inputToLoad = createElementWithIdClass(
//       'input',
//       'app__input-to-load-options',
//       ['app__input-to-load-options', 'hidden'],
//     );
//   }

//   public get inputToLoad(): HTMLElement {
//     return this._inputToLoad;
//   }

//   public loadOptions() {
//     if (this._inputToLoad instanceof HTMLInputElement) {
//       this._inputToLoad.type = 'file';
//       document.body.append(this._inputToLoad);
//       this._inputToLoad.click();
//       this._inputToLoad.addEventListener('change', (event) => {
//         if (event.target instanceof HTMLInputElement) {
//             event.target?.files?[0]
//         }
//       });
//     }
//   }
// }
