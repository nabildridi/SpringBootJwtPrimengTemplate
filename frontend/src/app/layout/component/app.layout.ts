import { Component, HostListener } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppTopbar } from './app.topbar';
import { AppSidebar } from './app.sidebar';
import { AppFooter } from './app.footer';
import { LayoutService } from '../../services/layout/layout.service';
import { AppAside } from './app.aside';
import { RmNgDeviceDetectionService } from 'rm-ng-device-detection';
import { AppMenu } from './app.menu';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, AppMenu, AppTopbar],
  template: `
    <div class="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" class="drawer-toggle inline" />
      <div class="drawer-content">
        <app-topbar></app-topbar>

        <!-- Page content here -->
        <div class="p-4"><router-outlet /></div>
      </div>

      <div class="drawer-side is-drawer-close:overflow-visible ">
        <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
        <div
          class="flex min-h-full flex-col items-start bg-base-200 dark:bg-gray-800 is-drawer-close:w-14 is-drawer-open:w-64"
        >
          <!-- Sidebar content here -->
          <app-menu></app-menu>
        </div>
      </div>
    </div>
  `,
})
export class AppLayout {
  constructor(public layoutService: LayoutService) {}

  toggleDarkMode() {
    this.layoutService.toggleDarkMode();
  }
}
