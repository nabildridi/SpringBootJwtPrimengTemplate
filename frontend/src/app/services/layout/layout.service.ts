import { Injectable, effect, signal, computed, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  darkTheme: WritableSignal<boolean> = signal(false);
  menuState: WritableSignal<boolean> = signal(false);

  toggleDarkMode(): void {
    this.darkTheme.set(!this.darkTheme());
    if (this.darkTheme()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  onMenuToggle() {
    this.menuState.set(!this.menuState());
  }
}
