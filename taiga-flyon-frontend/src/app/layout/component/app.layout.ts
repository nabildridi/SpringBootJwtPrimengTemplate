import { Component, HostListener, signal } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppTopbar } from './app.topbar';
import { LayoutService } from '../../services/layout/layout.service';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, AppTopbar],
  template: `
    <div class="flex overflow-hidden w-screen h-screen ">
      <aside
        id="collapsible-mini-sidebar"
        class="overlay [--auto-close:sm] overlay-minified:w-17  sm:shadow-none overlay-open:translate-x-0 drawer drawer-start hidden w-66  sm:flex sm:translate-x-0 border-e border-base-content/20"
        role="dialog"
        tabindex="-1"
        [class]="layoutService.sidebarOpened() ? '' : 'minified'"
      >
        <div class="drawer-header  overlay-minified:px-3.75 py-2 w-full flex items-center gap-3">
          <h3 class="drawer-title text-xl font-semibold overlay-minified:hidden">Vinitopia</h3>
        </div>
        <div class="drawer-body px-2 pt-4">
          <ul class="menu p-0">
            @for (item of menuItems; track $index) {
              <li class="py-2 ">
                <button
                  [routerLink]="item.routerLink"
                  class="daisy-btn justify-start"
                  routerLinkActive
                  #rla="routerLinkActive"
                  [class]="rla.isActive ? 'btn-primary btn-active' : 'btn-outline'"
                >
                  <i [class]="'bx bx-' + item.icon"></i>

                  <span class="overlay-minified:hidden">{{ item.label }}</span>
                </button>
              </li>
            }
          </ul>
        </div>
      </aside>
      <!-- Right column: header on top, main fills the rest -->
      <div
        class="flex  min-w-0  flex-1 flex-col"
        [class]="layoutService.sidebarOpened() ? 'ml-66' : 'ml-16'"
      >
        <app-topbar></app-topbar>

        <!-- The only scrollable area -->
        <main class="flex-1 overflow-y-auto p-4 bg-base-200">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class AppLayout {
  menuItems: any[] = [
    {
      label: 'Users',
      icon: 'user',
      routerLink: '/private/users',
      routerLinkActiveOptions: { exact: true },
    },

    {
      label: 'table without pagination',
      icon: 'tag',
      routerLink: '/private/bobo',
      routerLinkActiveOptions: { exact: true },
    },

    {
      label: 'Components Tester',
      icon: 'test-tube',
      routerLink: '/private/tester',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Stepper with MultiForms',
      icon: 'steps-up',
      routerLink: '/private/stepper',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'filtered-list',
      icon: 'list',
      routerLink: '/private/filtered-list-v2',
      routerLinkActiveOptions: { exact: true },
    },
  ];

  constructor(public layoutService: LayoutService) {}
}
