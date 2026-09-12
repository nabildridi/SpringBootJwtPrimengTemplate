import { Component, computed, effect, inject, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppTopbar } from './app.topbar';
import { AppSidebar } from './app.sidebar';
import { AppFooter } from './app.footer';
import { LayoutService } from '../../services/layout/layout.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [AppTopbar, AppSidebar, RouterModule, AppFooter],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `<div class="layout-wrapper">
    <app-topbar />
    <app-sidebar />
    <div class="layout-main-container">
      <div class="layout-main">
        <router-outlet />
      </div>
      <app-footer />
    </div>
    <div class="layout-mask"></div>
  </div> `,
})
export class AppLayout {
  layoutService = inject(LayoutService);

  constructor() {}
}
