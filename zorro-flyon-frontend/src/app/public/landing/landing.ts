import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  imports: [RouterLink],
  selector: 'app-landing',
  styleUrl: './landing.css',
  templateUrl: './landing.html',
})
export class Landing {
  constructor(private toastService: ToastService) {}

  showToast() {
    this.toastService.showError('all');
  }
}
