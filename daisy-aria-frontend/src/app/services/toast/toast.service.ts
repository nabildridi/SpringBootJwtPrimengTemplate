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

  protected notify(variant: Variant): void {
    const copy = {
      info: { title: 'Heads up', description: 'A new version is available.' },
      success: { title: 'Saved', description: 'Your changes were saved.' },
      warning: { title: 'Storage almost full', description: 'You have used 90% of your quota.' },
      error: { title: 'Upload failed', description: 'The file could not be uploaded.' },
    }[variant];
    this.#track(
      this.forToastManager.show({
        variant,
        duration: this.duration,
        region: 'toast-variants',
        ...copy,
      }),
    );
  }

  #track(ref: ForToastRef): void {
    this.#opened.add(ref);
    void ref.closed.then(() => this.#opened.delete(ref));
  }

  public showMesssage(severity: any, title: any, message: any) {
    if (severity == 'success') {
      this.notify('info');
    }

    if (severity == 'error') {
      this.notify('error');
    }
  }

  public showSuccess(message: any) {
    this.showMesssage('success', 'Success', message);
  }

  public showError(message: any) {
    this.showMesssage('error', 'Error', message);
  }
}
