import { Injectable } from '@angular/core';
import { KodonToast } from '../../shared/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private kodonToast: KodonToast) {}

  public showMesssage(severity: any, title: any, message: any) {
    if (severity == 'success') {
      this.kodonToast.success(message);
    }

    if (severity == 'error') {
      this.kodonToast.error(message);
    }
  }

  public showSuccess(message: any) {
    this.showMesssage('success', 'Success', message);
  }

  public showError(message: any) {
    this.showMesssage('error', 'Error', message);
  }
}
