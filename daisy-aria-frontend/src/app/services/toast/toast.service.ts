import { DestroyRef, inject, Injectable } from '@angular/core';
import { ForToastManager, type ForToastRef } from 'forty-cdk/toast';

type Variant = 'info' | 'success' | 'warning' | 'error';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private duration: number = 10000;

  readonly #opened = new Set<ForToastRef>();

  constructor(private forToastManager: ForToastManager) {
    inject(DestroyRef).onDestroy(() => {
      for (const ref of this.#opened) {
        ref.dismiss();
      }
    });
  }

  protected notify(variant: Variant, title: any, message: any): void {
    this.#track(
      this.forToastManager.show({
        variant: variant,
        title: title,
        description: message,
        duration: this.duration,
        dismissible: true,
      }),
    );
  }

  #track(ref: ForToastRef): void {
    this.#opened.add(ref);
    void ref.closed.then(() => this.#opened.delete(ref));
  }

  public showMesssage(severity: any, title: any, message: any) {
    if (severity == 'success') {
      this.notify('success', title, message);
    }

    if (severity == 'error') {
      this.notify('error', title, message);
    }
  }

  public showSuccess(message: any) {
    this.showMesssage('success', 'Success', message);
  }

  public showError(message: any) {
    this.showMesssage('error', 'Error', message);
  }
}
