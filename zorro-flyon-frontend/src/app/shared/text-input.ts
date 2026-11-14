import { Component, input, model, OnInit, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { NzInputModule } from 'ng-zorro-antd/input';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'n-text-input',
  imports: [NzInputModule],
  template: `
    <label class="floating-label">
      <span [class.requ]="required()">{{ label() }}</span>
      <nz-input-wrapper>
        <i nzInputPrefix [class]="'bx bx-' + icon()"></i>
        <input
          nz-input
          [type]="type()"
          [value]="value()"
          (input)="value.set($event.target.value)"
          [nzStatus]="invalid() ? 'error' : ''"
          [placeholder]="label()"
          autocomplete="off"
          [nzVariant]="'outlined'"
          class="h-10"
        />
        @if (value()) {
          <i nzInputSuffix class="bx bx-x cursor-pointer" (click)="reset()"></i>
        }
      </nz-input-wrapper>
    </label>
  `,
})
export class DaisyTextInput implements FormValueControl<string | null>, OnInit {
  value = model<string | null>(null);
  label = input<string>('');
  invalid = input<boolean>(false);
  required = input<boolean>(false);
  type = input<string>('text');
  icon = input<string | null>(null);

  ngOnInit(): void {}

  reset() {
    this.value.set(null);
  }
}
