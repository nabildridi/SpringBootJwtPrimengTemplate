import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}

  public showMesssage(severity: any, title: any, message: any) {}

  public showSuccess(message: any) {
    this.showMesssage('positive', 'Success', message);
  }

  public showError(message: any) {
    this.showMesssage('secondary-destructive', 'Error', message);
  }
}
