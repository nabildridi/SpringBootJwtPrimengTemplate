import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout/layout.service';
import { DrawerModule } from '@openng/optimus-ui/drawer';
import { AppMenu } from './app.menu';

@Component({
  selector: 'app-sidebar',
  styles: `
    :host ::ng-deep .p-drawer {
      background-color: #0f172b;
    }
  `,
  imports: [DrawerModule, AppMenu],
  template: `
    <p-drawer [(visible)]="layoutService.menuState" [closable]="false">
      <app-menu></app-menu>
    </p-drawer>
  `,
})
export class AppSidebar {
  constructor(public layoutService: LayoutService) {}
}
