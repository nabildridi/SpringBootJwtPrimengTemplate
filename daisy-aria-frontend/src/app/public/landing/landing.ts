import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
import { AppLogoText } from '../../layout/app.logo.text';
import { LayoutService } from '../../services/layout/layout.service';

@Component({
  imports: [RouterLink, AppLogoText],
  selector: 'app-landing',
  styleUrl: './landing.css',
  templateUrl: './landing.html',
})
export class Landing {
  constructor(
    public layoutService: LayoutService,
    private toastService: ToastService,
  ) {}

  toggleDarkMode() {
    this.layoutService.toggleDarkMode();
  }

  showToast() {
    this.toastService.showSuccess('all wrong');
  }
}
