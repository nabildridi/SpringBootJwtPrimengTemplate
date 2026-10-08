import { HostListener, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  darkTheme: WritableSignal<boolean> = signal(false);

  constructor() {}

  toggleDarkMode(): void {
    this.darkTheme.set(!this.darkTheme());
    const element = document.querySelector('html');
    element?.classList.toggle('dark');
  }
}
