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
  styles: `
    :host ::ng-deep .p-menu {
      background-color: #0f172b;
      border: 1px #0f172b;
    }
  `,
  template: `
    <!-- Brand Logo / Title -->
    <div
      class="h-16 flex justify-center items-center w-full  border-b border-slate-800 text-white font-bold text-lg "
    >
      <div class="flex">AppBrand</div>
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1 px-1 space-y-1 overflow-y-auto">
      @for (item of menuItems; track $index) {
        <a
          [routerLink]="item.routerLink"
          class="flex items-center px-3 py-3 text-white  rounded-lg"
          routerLinkActive
          #rlRef="routerLinkActive"
          [ngClass]="
            rlRef.isActive
              ? 'text-white bg-indigo-600 group'
              : ' hover:bg-amber-600 hover:text-white transition-colors'
          "
          [routerLinkActiveOptions]="{ exact: true }"
        >
          <span class="w-5 h-5 mr-2" [class]="item.icon"></span>
          {{ item.label }}
        </a>
      }
    </nav>
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
