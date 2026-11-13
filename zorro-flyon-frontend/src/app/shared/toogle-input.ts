import { Component, Input, model } from '@angular/core';

import { FormCheckboxControl } from '@angular/forms/signals';

@Component({
  selector: 'n-toggle',
  imports: [],
  template: `
    <input
      type="checkbox"
      [attr.checked]="checked() ? 'checked' : null"
      (click)="toggle()"
      [id]="id"
      class="toggle toggle-primary"
    />
  `,
})
export class DaisyToggle implements FormCheckboxControl {
  @Input()
  id!: string;

  /** Whether the toggle is checked */
  checked = model<boolean>(false);

  toggle() {
    this.checked.update((val) => !val);
  }
}
