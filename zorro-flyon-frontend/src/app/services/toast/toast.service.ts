import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private duration: number = 10000;

  constructor(private nzNotificationService: NzNotificationService) {}

  public showMesssage(severity: any, title: any, message: any) {
    if (severity == 'success') {
      this.nzNotificationService.success(title, message, { nzDuration: this.duration });
    }

    if (severity == 'error') {
      this.nzNotificationService.error(title, message, { nzDuration: this.duration });
    }
  }

  public showSuccess(message: any) {
    this.showMesssage('success', 'Success', message);
  }

  public showError(message: any) {
    this.showMesssage('error', 'Error', message);
  }
}
