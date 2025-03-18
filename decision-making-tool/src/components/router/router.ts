import { DecisionPickerScreen } from '../dom/decision-picker-screen/decision-picker-screen';
import { StartScreen } from '../dom/start-screen/start-screen';

export class Router {
  private static routes: Record<string, () => void> = {};

  public static init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    document.addEventListener('DOMContentLoaded', () => this.handleRoute());
  }

  public static addRoute(path: string, handler: () => void) {
    this.routes[path] = handler;
  }

  public static navigateTo(path: string) {
    if (location.hash !== `#${path}`) {
      location.hash = path;
    }
  }

  private static handleRoute() {
    const path = location.hash.slice(1) || '/';
    if (path === '/picker') {
      DecisionPickerScreen.show();
    } else {
      StartScreen.show();
    }
  }
}
