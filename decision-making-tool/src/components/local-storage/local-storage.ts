import { type Option } from '../options/options';

export class LocalStorage {
  public static saveToLocalStorage(key: string, value: Option[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static getFromLocalStorage(key: string): Option[] | [] {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : [];
  }

  public static clearLocalStorage(): void {
    localStorage.clear();
  }

  public static removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }
}
