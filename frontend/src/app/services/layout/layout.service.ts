import { HostListener, Injectable, signal, WritableSignal } from '@angular/core';
import { RmNgDeviceDetectionService, DeviceInfo } from 'rm-ng-device-detection';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  darkTheme: WritableSignal<boolean> = signal(false);
  menuState: WritableSignal<boolean> = signal(false);
  asideState: WritableSignal<boolean> = signal(false);
  screenWidth: WritableSignal<number> = signal(0);

  constructor(private deviceService: RmNgDeviceDetectionService) {}

  toggleDarkMode(): void {
    this.darkTheme.set(!this.darkTheme());
    if (this.darkTheme()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  onMenuToggle() {
    if (this.screenWidth() < 991) {
      this.asideState.set(false);
      this.menuState.set(!this.menuState());
    } else {
      this.menuState.set(false);
      this.asideState.set(!this.asideState());
    }
  }
}
