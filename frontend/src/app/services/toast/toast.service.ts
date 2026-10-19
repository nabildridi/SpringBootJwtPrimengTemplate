import { Injectable } from '@angular/core';
import { TuiNotificationService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private tuiNotificationService: TuiNotificationService) {}

  public showMesssage(severity: any, title: any, message: any) {
    this.tuiNotificationService.open(message, { label: title, appearance: severity }).subscribe();
  }

  public showSuccess(message: any) {
    this.showMesssage('positive', 'Success', message);
  }

  public showError(message: any) {
    this.showMesssage('secondary-destructive', 'Error', message);
  }
}
