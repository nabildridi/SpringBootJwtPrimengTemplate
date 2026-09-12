import { Component, effect, inject } from '@angular/core';
import { LayoutService } from '../../services/layout/layout.service';
import { DrawerModule } from '@openng/optimus-ui/drawer';

@Component({
  selector: 'app-sidebar',
  imports: [DrawerModule],
  template: `
    <p-drawer [(visible)]="layoutService.menuState" header="Drawer">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </p-drawer>
  `,
})
export class AppSidebar {
  constructor(public layoutService: LayoutService) {}
}
