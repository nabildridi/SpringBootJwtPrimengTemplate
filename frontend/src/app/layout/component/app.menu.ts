import { Component, effect, inject } from '@angular/core';
import { LayoutService } from '../../services/layout/layout.service';
import { DrawerModule } from '@openng/optimus-ui/drawer';
import { MenuModule } from '@openng/optimus-ui/menu';
import { MenuItem } from '@openng/optimus-ui/api';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, DrawerModule, MenuModule, RouterLink, RouterModule],
  template: `
    <!-- Navigation Links -->
    <ul class="menu w-full grow">
      @for (item of menuItems; track $index) {
        <li class="px-1 py-2">
          <a
            [routerLink]="item.routerLink"
            class="flex rounded-lg is-drawer-close:tooltip is-drawer-close:tooltip-right"
            routerLinkActive
            #rlRef="routerLinkActive"
            active
            [ngClass]="
              rlRef.isActive
                ? 'text-white bg-indigo-600 group'
                : ' hover:bg-amber-600 hover:text-white transition-colors'
            "
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <i [class]="item.icon" class="text-black dark:text-white"></i>
            <span class="is-drawer-close:hidden text-black dark:text-white">{{ item.label }}</span>
          </a>
        </li>
      }
    </ul>
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

  constructor(public layoutService: LayoutService) {}
}
