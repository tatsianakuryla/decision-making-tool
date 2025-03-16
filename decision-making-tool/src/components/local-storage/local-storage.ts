import { type Option } from '../OptionsStore/options-store';

export class LocalStorage {
  public static saveData(key: string, value: Option[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static getData(key: string): Option[] | [] {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : [];
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
