import { Component, input, model, OnInit, Signal, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { v4 as uuidv4 } from 'uuid';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'n-password-input',
  imports: [NzInputModule],
  template: `
    <label class="floating-label">
      <span [class.requ]="required()">{{ label() }}</span>
      <nz-input-wrapper>
        <i nzInputPrefix class="bx bx-key"></i>

        <input
          nz-input
          [id]="inputId"
          [type]="show() ? 'text' : 'password'"
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

        <i
          nzInputSuffix
          [class]="show() ? 'bx bx-eye-slash' : 'bx bx-eye'"
          class="cursor-pointer"
          (click)="toggle()"
        ></i>
      </nz-input-wrapper>
    </label>
  `,
})
export class DaisyPasswordInput implements FormValueControl<string | null>, OnInit {
  value = model<string | null>(null);
  label = input<string>('');
  invalid = input<boolean>(false);
  required = input<boolean>(false);

  inputId: string = uuidv4();
  show = signal<boolean>(false);

  ngOnInit(): void {}

  toggle() {
    this.show.update((value) => !value);
  }

  reset() {
    this.value.set(null);
  }
}
