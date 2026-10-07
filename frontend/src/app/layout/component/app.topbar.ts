import { Component, inject } from '@angular/core';
import { LayoutService } from '../../services/layout/layout.service';
import { ButtonModule } from '@openng/optimus-ui/button';

@Component({
  selector: 'app-topbar',
  imports: [ButtonModule],
  template: ` <!-- Navbar -->
    <nav class="navbar w-full bg-base-300 dark:bg-gray-800 dark:text-white">
      <div class="flex w-full justify-between content-center">
        <div class="flex items-center">
          <label
            for="my-drawer-4"
            aria-label="open sidebar"
            class="daisy-btn btn-square btn-ghost drawer-button"
          >
            <!-- Sidebar toggle icon -->
            <i class="pi pi-bars text-black dark:text-white"></i>
          </label>
          <div class="px-4">Template</div>
        </div>
        <div class="flex">
          <button class="daisy-btn btn-circle" (click)="toggleDarkMode()">
            <i
              [class]="{
                pi: true,
                'pi-moon': layoutService.darkTheme(),
                'pi-sun': !layoutService.darkTheme(),
              }"
            ></i>
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
