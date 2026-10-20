import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout/layout.service';

import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-topbar',
  imports: [TuiIcon],
  template: ` <!-- Navbar -->
    <nav class="navbar shrink-0 w-full bg-base-300 dark:bg-zinc-500 dark:text-white">
      <div class="flex w-full justify-between content-center">
        <div class="flex items-center">
          <label
            for="my-drawer-4"
            aria-label="open sidebar"
            class="daisy-btn btn-square btn-ghost drawer-button"
          >
            <!-- Sidebar toggle icon -->
            <tui-icon icon="@tui.menu" class="text-black dark:text-white"></tui-icon>
          </label>
          <div class="px-4">Template</div>
        </div>
        <div class="flex">
          <button class="daisy-btn btn-circle" (click)="toggleDarkMode()">
            <tui-icon [icon]="layoutService.darkMode() ? '@tui.sun' : '@tui.moon'" />
          </button>
        </div>
      </div>
    </nav>`,
})
export class AppTopbar {
  constructor(public layoutService: LayoutService) {}

  toggleDarkMode() {
    this.layoutService.toggleDarkMode();
  }
}
