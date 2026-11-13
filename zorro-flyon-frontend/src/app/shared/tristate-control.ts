import { Component, input, model, output, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

import { FormsModule } from '@angular/forms';

export type TriState = boolean | null;

@Component({
  imports: [FormsModule],
  selector: 'n-tristate',
  template: `
    <div class="join join-horizontal">
      <button
        type="button"
        class="btn join-item aria-pressed:bg-primary border border-base-300"
        [aria-pressed]="value() == true ? 'true' : 'false'"
        (click)="setValue(true)"
      >
        {{ trueLabel() }}
      </button>
      <button
        type="button"
        class="btn join-item aria-pressed:bg-primary border border-base-300"
        [aria-pressed]="value() == false ? 'true' : 'false'"
        (click)="setValue(false)"
      >
        {{ falseLabel() }}
      </button>
      <button
        type="button"
        class="btn join-item aria-pressed:bg-primary border border-base-300"
        [aria-pressed]="value() == null ? 'true' : 'false'"
        (click)="setValue(null)"
      >
        {{ nullLabel() }}
      </button>
    </div>
  `,
})
export class DaisyTristate implements FormValueControl<TriState> {
  value = model<TriState>(null);
  trueLabel = input.required<string>();
  falseLabel = input.required<string>();
  nullLabel = input.required<string>();

  setValue(value: TriState) {
    this.value.update((item: TriState) => (item = value));
  }
}
