import { Component, input, model, OnInit, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { NgpInput } from 'ng-primitives/input';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'n-text-input',
  imports: [NgpInput],
  template: `
    <div class="input-floating w-full">
      <input
        ngpInput
        [id]="inputId"
        [type]="type()"
        [value]="value()"
        (input)="value.set($event.target.value)"
        [class.is-invalid]="invalid()"
        placeholder=" "
        class="input"
      />
      <label class="input-floating-label" [for]="inputId" [class.requ]="required()">{{
        label()
      }}</label>
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
}
