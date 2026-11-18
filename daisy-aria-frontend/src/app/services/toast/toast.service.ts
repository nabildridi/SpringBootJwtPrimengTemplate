import { Injectable } from '@angular/core';
import { HubToastService } from 'ng-hub-ui-toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private duration: number = 10000;

  constructor(private hubToastService: HubToastService) {}

  public showMesssage(severity: any, title: any, message: any) {
    if (severity == 'success') {
      this.hubToastService.success(message, title, {
        timeOut: this.duration,
        tapToDismiss: false,
        progressBar: true,
      });
    }

    if (severity == 'error') {
      this.hubToastService.error(message, title, {
        timeOut: this.duration,
        tapToDismiss: false,
        progressBar: true,
      });
    }
  }

  public showSuccess(message: any) {
    this.showMesssage('success', 'Success', message);
  }

  public showError(message: any) {
    this.showMesssage('error', 'Error', message);
  }
}
