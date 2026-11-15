import { Component } from '@angular/core';

import { AppLogoText } from './app.logo.text';
import { LayoutService } from '../services/layout/layout.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage-service';

@Component({
  selector: 'app-topbar',
  imports: [AppLogoText],
  template: ` <!-- Navbar -->
    <nav class="navbar shrink-0 w-full bg-mauve-300 dark:bg-mauve-800 dark:text-white">
      <div class="flex w-full justify-between content-center">
        <div class="flex items-center">
          <label
            for="my-drawer-4"
            aria-label="open sidebar"
            class="daisy-btn btn-square drawer-button"
            (click)="toggleDrawer()"
          >
            <!-- Sidebar toggle icon -->
            <i [class]="layoutService.drawerState() ? 'bx bx-x' : 'bx bx-menu'"></i>
          </label>
          <div class="px-4"></div>
        </div>
        <app-logo-text></app-logo-text>
        <div class="flex gap-x-2">
          <button class="daisy-btn btn-circle btn-primary" (click)="toggleDarkMode()">
            <i [class]="layoutService.darkMode() ? 'bx bx-sun' : 'bx bx-moon'"></i>
          </button>
          <button class="daisy-btn btn-circle btn-accent" (click)="logout()">
            <i class="bx bx-user"></i>
          </button>
          <button class="daisy-btn btn-circle btn-error" (click)="logout()">
            <i class="bx bx-arrow-out-right-square-half"></i>
          </button>
          @if (storageService.isSuperAdmin()) {
            <button class="daisy-btn btn-circle btn-accent" (click)="admin()">
              <i class="bx bx-cog"></i>
            </button>
          }
        </div>
      </div>
    </nav>`,
})
export class AppTopbar {
  constructor(
    public layoutService: LayoutService,
    public storageService: StorageService,
    private router: Router,
  ) {}

  toggleDarkMode() {
    this.layoutService.toggleDarkMode();
  }

  toggleDrawer() {
    this.layoutService.toggleDrawer();
  }

  logout() {
    this.storageService.clear();
    this.router.navigate(['/']);
  }

  admin() {
    this.router.navigate(['/admin']);
  }
}
