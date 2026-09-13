import {
  Component,
  computed,
  effect,
  inject,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppTopbar } from './app.topbar';
import { AppSidebar } from './app.sidebar';
import { AppFooter } from './app.footer';
import { LayoutService } from '../../services/layout/layout.service';
import { AppAside } from './app.aside';
import { RmNgDeviceDetectionService } from 'rm-ng-device-detection';

@Component({
  selector: 'app-layout',
  imports: [AppTopbar, AppSidebar, RouterModule, AppFooter, AppAside],
  template: `<div>
    <app-topbar />
    <app-sidebar />
    <div class="flex">
      <app-aside></app-aside>
      <div class="flex w-full">
        <router-outlet />
      </div>
    </div>
    <app-footer />
  </div> `,
})
export class AppLayout {
  constructor(
    private deviceService: RmNgDeviceDetectionService,
    public layoutService: LayoutService,
  ) {
    this.layoutService.screenWidth.set(this.deviceService.width);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.deviceService.updateScreenInfo();
    this.layoutService.screenWidth.set(this.deviceService.width);
  }
}
