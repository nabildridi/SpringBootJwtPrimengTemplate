import { Component, HostListener } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppTopbar } from './app.topbar';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, AppTopbar, TuiIcon],
  template: `
    <div
      class="flex overflow-hidden w-screen h-screen dark:bg-gray-700 bg-gray-100 drawer lg:drawer-open"
    >
      <input id="my-drawer-4" type="checkbox" class="drawer-toggle inline" />

      <!-- Vertical navigation: full height, never scrolls with the page -->
      <div class="drawer-side is-drawer-close:overflow-visible ">
        <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
        <div
          class="flex min-h-full flex-col items-start bg-base-300 dark:bg-zinc-500 is-drawer-close:w-16 is-drawer-open:w-64"
        >
          <!-- Sidebar content here -->
          <!-- Navigation Links -->
          <ul class="menu w-full grow mt-16 content-center">
            @for (item of menuItems; track $index) {
              <li class="py-2 ">
                <button
                  [routerLink]="item.routerLink"
                  class="btn btn-accent justify-start is-drawer-close:hidden"
                  routerLinkActive
                  #rla="routerLinkActive"
                  [class]="rla.isActive ? 'btn-active' : 'btn-soft'"
                >
                  <tui-icon [icon]="'@tui.' + item.icon"></tui-icon>
                  {{ item.label }}
                </button>

                <button
                  class="btn btn-square btn-accent is-drawer-open:hidden"
                  [routerLink]="item.routerLink"
                  routerLinkActive
                  #rla="routerLinkActive"
                  [class]="rla.isActive ? 'btn-active' : 'btn-ghost'"
                >
                  <tui-icon [icon]="'@tui.' + item.icon"></tui-icon>
                </button>
              </li>
            }
          </ul>
        </div>
      </div>

      <!-- Right column: header on top, main fills the rest -->
      <div class="flex min-w-0  flex-1 flex-col drawer-content">
        <app-topbar></app-topbar>

        <!-- The only scrollable area -->
        <main class="flex-1 overflow-y-auto p-4">
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
      icon: 'qr-code',
      routerLink: '/private/tester',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Stepper with MultiForms',
      icon: 'qr-code',
      routerLink: '/private/stepper',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Marques form',
      icon: 'qr-code',
      routerLink: '/private/marques',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'form-array-tester',
      icon: 'qr-code',
      routerLink: '/private/form-array-tester',
      routerLinkActiveOptions: { exact: true },
    },
  ];
  constructor() {}
}
