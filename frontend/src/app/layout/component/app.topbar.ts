import { Component, inject } from '@angular/core';
import { MenuItem } from '@openng/optimus-ui/api';
import { LayoutService } from '../../services/layout/layout.service';
import { ButtonModule } from '@openng/optimus-ui/button';

@Component({
  selector: 'app-topbar',
  imports: [ButtonModule],
  template: ` <header
    class="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 w-full"
  >
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2 font-bold text-xl text-white tracking-wide">
        <p-button (click)="openDrawer()" icon="pi pi-bars" />
      </div>

      <div class="flex items-center gap-2 font-bold text-xl text-white tracking-wide">
        <span class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white"
          >⚡</span
        >
        Acme Inc.
      </div>

      <div class="flex items-center gap-4">
        <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
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
  </header>`,
})
export class AppTopbar {
  items!: MenuItem[];

  layoutService = inject(LayoutService);

  openDrawer() {
    this.layoutService.onMenuToggle();
  }

  toggleDarkMode() {
    this.layoutService.toggleDarkMode();
  }
}
