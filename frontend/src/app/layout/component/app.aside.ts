import { Component, effect, inject } from '@angular/core';
import { LayoutService } from '../../services/layout/layout.service';
import { CommonModule } from '@angular/common';

import { AppMenu } from './app.menu';

@Component({
  selector: 'app-aside',
  imports: [AppMenu, CommonModule],
  template: `
    <aside
      class=" flex-shrink-0 h-full overflow-y-auto bg-slate-800 text-slate-200"
      [ngClass]="layoutService.asideState() ? 'w-64' : 'w-0'"
    >
      <app-menu></app-menu>
    </aside>
  `,
})
export class AppAside {
  constructor(public layoutService: LayoutService) {}
}
