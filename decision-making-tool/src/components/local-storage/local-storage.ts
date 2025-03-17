import { type Option } from '../Options-storage/options-storage';

export class LocalStorage {
  public static saveOptions(key: string, value: Option[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static getOptions(key: string): Option[] | null {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  }

  public static clear(): void {
    localStorage.clear();
  }

  public static removeData(key: string): void {
    localStorage.removeItem(key);
  }

  public static saveId(key: string, value: number): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static getId(key: string): number {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : 0;
  }
}
