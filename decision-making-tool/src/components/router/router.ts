// export class Router {
//   private static routes: Record<string, () => void> = {};

//   public static init() {
//     window.addEventListener('hashchange', () => this.handleRoute());
//     document.addEventListener('DOMContentLoaded', () => this.handleRoute());
//   }

//   public static addRoute(path: string, handler: () => void) {
//     this.routes[path] = handler;
//   }

//   public static navigateTo(path: string) {
//     location.hash = path;
//   }

//   private static handleRoute() {
//     const path = location.hash.slice(1) || '/';
//     if (this.routes[path]) {
//       this.routes[path]();
//     } else {
//       location.hash = '/';
//       this.routes['/']?.();
//     }
//   }
// }
