import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { TUI_DARK_MODE } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public darkMode = inject(TUI_DARK_MODE);

  constructor() {}

  init() {
    this.darkMode.reset();
    const element = document.querySelector('html');

    if (this.darkMode() == true) {
      element?.classList.add('dark');
      document.querySelector('html')?.setAttribute('data-theme', 'night');
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
      document.querySelector('html')?.setAttribute('data-theme', 'night');
    } else {
      document.querySelector('html')?.setAttribute('data-theme', 'corporate');
    }
  }
}
