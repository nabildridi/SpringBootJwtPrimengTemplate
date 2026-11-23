import { Component, inject, Service } from '@angular/core';
import { ForDialogManager } from 'forty-cdk/dialog';
import { ConfirmData, ConfirmResult, DaisyConfirm } from '../../shared/confirm-dialog';
import { from, Observable } from 'rxjs';

@Service()
export class ConfirmService {
  private forDialogManager = inject(ForDialogManager);

  open(confirmData: ConfirmData): Observable<'confirm' | 'cancel' | undefined> {
    const ref = this.forDialogManager.open<DaisyConfirm, ConfirmResult, ConfirmData>(DaisyConfirm, {
      data: confirmData,
      alert: true,
      dismissible: false,
      class: 'programmatic-dialog programmatic-dialog--pop',
      animateLeave: 'programmatic-out',
      backdropAnimateLeave: 'programmatic-backdrop-out',
    });

    return from(ref.closed.then((res) => res.result));
  }
}
