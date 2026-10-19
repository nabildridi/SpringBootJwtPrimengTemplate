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
          class="flex min-h-full flex-col items-start bg-base-300 dark:bg-zinc-500 is-drawer-close:w-14 is-drawer-open:w-64"
        >
          <!-- Sidebar content here -->
          <!-- Navigation Links -->
          <ul class="menu w-full grow mt-8">
            @for (item of menuItems; track $index) {
              <li class="py-2">
                <a
                  [routerLink]="item.routerLink"
                  class="nav-link"
                  routerLinkActive
                  ariaCurrentWhenActive="page"
                >
                  <tui-icon [icon]="'@tui.' + item.icon"></tui-icon>
                  <span class="is-drawer-close:hidden">{{ item.label }}</span>
                </a>
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
      label: 'private-menu.menu1',
      icon: 'user',
      routerLink: '/private/users',
      routerLinkActiveOptions: { exact: true },
    },

    {
      label: 'private-menu.menu2',
      icon: 'tag',
      routerLink: '/private/bobo',
      routerLinkActiveOptions: { exact: true },
    },

    {
      label: 'private-menu.menu3',
      icon: 'qr-code',
      routerLink: '/private/users',
      routerLinkActiveOptions: { exact: true },
    },

    {
      label: 'private-menu.menu5',
      icon: 'pencil',
      routerLink: '/private/users',
      routerLinkActiveOptions: { exact: true },
    },

    {
      label: 'private-menu.menu4',
      icon: 'log-out',
      command: () => {},
    },

    {
      label: 'private-menu.link1',
      icon: 'book',
      command: () => {},
    },
  ];
  constructor() {}
}
