import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  darkMode = signal<boolean>(false);

  public sidebarOpened = signal<boolean>(false);

  constructor() {}

  init() {
    this.darkMode.set(
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    );
    const element = document.querySelector('html');

    if (this.darkMode() == true) {
      element?.classList.add('dark');
      document.querySelector('html')?.setAttribute('data-theme', 'dim');
    } else {
      element?.classList.remove('dark');
      document.querySelector('html')?.setAttribute('data-theme', 'corporate');
    }
  }

  toggleDarkMode(): void {
    this.darkMode.update((dark) => !dark);
    const element = document.querySelector('html');
    element?.classList.toggle('dark');

    if (this.darkMode() == true) {
      document.querySelector('html')?.setAttribute('data-theme', 'dim');
    } else {
      document.querySelector('html')?.setAttribute('data-theme', 'corporate');
    }
  }

  public toggleDrawer() {
    this.sidebarOpened.update((value) => !value);
  }
}
