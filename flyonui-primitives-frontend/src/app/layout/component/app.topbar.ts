import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout/layout.service';

@Component({
  selector: 'app-topbar',
  imports: [],
  template: ` <!-- Navbar -->
    <nav class="navbar shrink-0 w-full bg-base-300 dark:bg-zinc-500 dark:text-white">
      <div class="flex w-full justify-between content-center">
        <div class="flex items-center">
          <label class="daisy-btn btn-square btn-ghost" (click)="toggleDrawer()">
            <i class="bx bx-menu text-2xl "></i>
          </label>
          <div class="px-4">Template</div>
        </div>
        <div class="flex">
          <button class="daisy-btn btn-circle" (click)="toggleDarkMode()">
            <i [class]="layoutService.darkMode() ? 'bx bx-sun' : 'bx bx-moon'"></i>
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

  toggleDrawer() {
    this.layoutService.toggleDrawer();
  }
}
