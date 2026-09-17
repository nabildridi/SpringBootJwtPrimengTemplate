import { Component, inject } from '@angular/core';
import { MenuItem } from '@openng/optimus-ui/api';
import { LayoutService } from '../../services/layout/layout.service';
import { ButtonModule } from '@openng/optimus-ui/button';
import { ToolbarModule } from '@openng/optimus-ui/toolbar';

@Component({
  selector: 'app-topbar',
  imports: [ButtonModule, ToolbarModule],
  template: ` <header class="pl-1 pr-1 sticky">
    <p-toolbar>
      <ng-template #start>
        <p-button (click)="openDrawer()" icon="pi pi-bars" />
      </ng-template>
      <ng-template #end>
        <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
          <i
            [class]="{
              pi: true,
              'pi-moon': layoutService.darkTheme(),
              'pi-sun': !layoutService.darkTheme(),
            }"
          ></i>
        </button>
      </ng-template>
    </p-toolbar>
  </header>`,
})
export class AppTopbar {
  items!: MenuItem[];

  constructor(public layoutService: LayoutService) {}

  openDrawer() {
    this.layoutService.onMenuToggle();
  }

  toggleDarkMode() {
    this.layoutService.toggleDarkMode();
  }
}
