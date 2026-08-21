import { Injectable } from '@angular/core';
import { SignalsService } from '../signals/signals.service';
import { MessageService } from '@openng/optimus-ui/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    private messageService: MessageService,
    private signalsService: SignalsService,
  ) {}

  public showMesssage(severity: any, title: any, message: any) {
    this.messageService.add({
      severity: severity,
      summary: title,
      detail: message,
      life: 3000,
    });
  }

  public showSuccess(message: any) {
    this.showMesssage('success', 'success', message);
  }

  public showError(message: any) {
    this.showMesssage('error', 'error', message);
  }
}
