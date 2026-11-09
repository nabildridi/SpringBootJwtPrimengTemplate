import { Component, input, model, OnInit, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { NgpInput } from 'ng-primitives/input';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'n-text-input',
  imports: [NgpInput],
  template: `
    <div class="input w-full">
      <div class="input-floating grow">
        <input
          ngpInput
          [id]="inputId"
          [type]="type()"
          [value]="value()"
          (input)="value.set($event.target.value)"
          [class.is-invalid]="invalid()"
          placeholder=" "
          autocomplete="off"
        />
        <label class="input-floating-label" [for]="inputId" [class.requ]="required()">{{
          label()
        }}</label>
      </div>

      @if (value()) {
        <span
          class="bx bx-x cursor-pointer text-base-content/80 my-auto ms-3 size-5 shrink-0"
          (click)="reset()"
        ></span>
      }
    </div>
  `,
})
export class DaisyTextInput implements FormValueControl<string | null>, OnInit {
  value = model<string | null>(null);
  label = input<string>('');
  invalid = input<boolean>(false);
  required = input<boolean>(false);
  type = input<string>('text');
  icon = input<string | null>(null);

  inputId: string = uuidv4();

  ngOnInit(): void {}

  reset() {
    this.value.set(null);
  }
}
