import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppTopbar } from './app.topbar';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, AppTopbar],
  template: `
    <div
      class="flex overflow-hidden w-screen h-screen dark:bg-gray-700 bg-gray-100 drawer lg:drawer-open"
    >
      <input id="my-drawer-4" type="checkbox" class="drawer-toggle inline" />

      <!-- Vertical navigation: full height, never scrolls with the page -->
      <div class="drawer-side is-drawer-close:overflow-visible ">
        <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
        <div
          class="flex  min-h-full flex-col items-start bg-mauve-300 dark:bg-mauve-800 is-drawer-close:w-16 is-drawer-open:w-64"
        >
          <div class="h-12"></div>
          <!-- Sidebar content here -->
          <!-- Navigation Links -->
          <ul class="menu w-full grow">
            @for (item of menuItems; track $index) {
              <li class="py-2">
                <button
                  [routerLink]="item.routerLink"
                  class="btn btn-accent justify-start is-drawer-close:hidden"
                  routerLinkActive
                  #rla="routerLinkActive"
                  [class]="rla.isActive ? 'btn-active' : 'btn-soft'"
                >
                  <i [class]="'bx bx-' + item.icon"></i>
                  {{ item.label }}
                </button>

                <button
                  class="btn btn-square btn-accent  is-drawer-open:hidden"
                  [routerLink]="item.routerLink"
                  routerLinkActive
                  #rla="routerLinkActive"
                  [class]="rla.isActive ? 'btn-active' : 'btn-ghost'"
                >
                  <i [class]="'bx bx-' + item.icon"></i>
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
        <main class="flex-1 overflow-y-auto p-4  bg-secondary">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class AppLayout {
  menuItems: any[] = [
    {
      label: 'Produits',
      icon: 'qr',
      routerLink: '/private/produits',
    },
    {
      label: 'Marques',
      icon: 'store',
      routerLink: '/private/marques',
    },
    {
      label: 'Users',
      icon: 'user',
      routerLink: '/private/users',
    },

    {
      label: 'Experiments',
      icon: 'tag',
      routerLink: '/private/bobo',
    },
  ];

  constructor() {}
}
