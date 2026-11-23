import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import {
  ForDialogBackdrop,
  ForDialogClose,
  ForDialogDescription,
  ForDialogTitle,
  injectDialogData,
} from 'forty-cdk/dialog';

export interface ConfirmData {
  readonly title: string;
  readonly message: string;
  readonly confirmText: string;
  readonly cancelText: string;
}

export type ConfirmResult = 'confirm' | 'cancel';

@Component({
  selector: 'n-confirm',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ForDialogBackdrop, ForDialogTitle, ForDialogDescription, ForDialogClose],
  template: `
    <div
      forDialogBackdrop
      class="programmatic-backdrop"
      animate.enter="programmatic-backdrop-in"
    ></div>
    <div class="card bg-base-100 shadow-sm">
      <div class="card-body">
        <h2 forDialogTitle class="card-title">{{ data?.title }}</h2>
        <p forDialogDescription>
          {{ data?.message }}
        </p>
        <div class="card-actions justify-end">
          <button class="btn" forDialogClose [closeWith]="cancel">
            {{ data?.cancelText }}
          </button>
          <button class="btn btn-error" forDialogClose [closeWith]="confirm">
            {{ data?.confirmText }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export class DaisyConfirm {
  protected readonly data = injectDialogData<ConfirmData>();
  protected readonly cancel: ConfirmResult = 'cancel';
  protected readonly confirm: ConfirmResult = 'confirm';
}
