import { Component, input, model, OnInit, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { NgpInput } from 'ng-primitives/input';

@Component({
  selector: 'n-text-input',
  imports: [NgpInput],
  template: `
    <label class="floating-label w-full">
      <span [class.requ]="required()">{{ label() }}</span>
      <input
        ngpInput
        [type]="type()"
        [placeholder]="label()"
        [value]="value()"
        (input)="value.set($event.target.value)"
        class="input w-full"
        [attr.data-invalid]="invalid() ? '' : null"
      />
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
}
