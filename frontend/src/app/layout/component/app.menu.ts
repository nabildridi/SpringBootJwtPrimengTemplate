import { Component, effect, inject } from '@angular/core';
import { DrawerModule } from '@openng/optimus-ui/drawer';
import { MenuModule } from '@openng/optimus-ui/menu';
import { MenuItem } from '@openng/optimus-ui/api';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppFooter } from './app.footer';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, DrawerModule, MenuModule, RouterLink, RouterModule, AppFooter],
  template: `
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
            <i [class]="item.icon"></i>
            <span class="is-drawer-close:hidden">{{ item.label }}</span>
          </a>
        </li>
      }
    </ul>
    <app-footer></app-footer>
  `,
})
export class AppMenu {
  menuItems: MenuItem[] = [
    {
      label: 'private-menu.menu1',
      icon: 'pi pi-user',
      routerLink: '/private/users',
      routerLinkActiveOptions: { exact: true },
    },

    {
      label: 'private-menu.menu2',
      icon: 'pi pi-tag',
      routerLink: '/private/bobo',
      routerLinkActiveOptions: { exact: true },
    },

    {
      label: 'private-menu.menu3',
      icon: 'pi pi-qrcode',
      routerLink: '/private/users',
      routerLinkActiveOptions: { exact: true },
    },

    {
      label: 'private-menu.menu5',
      icon: 'pi pi-facebook',
      routerLink: '/private/users',
      routerLinkActiveOptions: { exact: true },
    },

    {
      label: 'private-menu.menu4',
      icon: 'pi pi-sign-out',
      command: () => {},
    },

    {
      label: 'private-menu.link1',
      icon: 'pi pi-book',
      command: () => {},
    },
  ];

  constructor() {}
}
