import { Component, HostListener } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppTopbar } from './app.topbar';
import { AppSidebar } from './app.sidebar';
import { AppFooter } from './app.footer';
import { LayoutService } from '../../services/layout/layout.service';
import { AppAside } from './app.aside';
import { RmNgDeviceDetectionService } from 'rm-ng-device-detection';

@Component({
  selector: 'app-layout',
  imports: [AppTopbar, AppSidebar, RouterModule, AppFooter, AppAside],
  template: `<div class="flex h-screen flex-col overflow-hidden bg-gray-100 w-full">
    <app-topbar />
    <app-sidebar />

    <div class="flex w-full overflow-hidden h-full">
      <app-aside></app-aside>
      <div class="flex flex-1 h-full flex-col overflow-y-auto">
        <main class="p-6">
          <router-outlet />
        </main>
        <app-footer />
      </div>
    </div>
  </div> `,
})
export class AppLayout {
  constructor(
    private deviceService: RmNgDeviceDetectionService,
    public layoutService: LayoutService,
  ) {
    this.layoutService.screenWidth.set(this.deviceService.width);

    if (this.deviceService.width < 991) {
      this.layoutService.asideState.set(false);
      this.layoutService.menuState.set(true);
    } else {
      this.layoutService.menuState.set(false);
      this.layoutService.asideState.set(true);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.deviceService.updateScreenInfo();
    this.layoutService.screenWidth.set(this.deviceService.width);

    if (this.deviceService.width < 991) {
      this.layoutService.asideState.set(false);
      this.layoutService.menuState.set(false);
    } else {
      this.layoutService.menuState.set(false);
      this.layoutService.asideState.set(true);
    }
  }
}
