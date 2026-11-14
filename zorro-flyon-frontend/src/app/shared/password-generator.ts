import { Component, input, model, output, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

import { FormsModule } from '@angular/forms';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSliderModule, NzSliderValue } from 'ng-zorro-antd/slider';

@Component({
  imports: [FormsModule, NzPopoverModule, NzInputModule, NzSliderModule],
  selector: 'n-password-generator',
  template: `
    <label
      class="floating-label"
      nz-popover
      [nzPopoverContent]="contentTemplate"
      nzPopoverTitle="Générateur"
    >
      <span [class.requ]="required()">{{ label() }}</span>
      <nz-input-wrapper>
        <i nzInputPrefix class="bx bx-key"></i>

        <input
          nz-input
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

    <ng-template #contentTemplate>
      <div class="w-96 bg-base-300 m-4">
        <nz-slider
          [nzTipFormatter]="formatter"
          [nzMin]="8"
          [nzMax]="20"
          nzTooltipVisible="always"
          (nzOnAfterChange)="generate($event)"
          class="w-full"
        />
      </div>
    </ng-template>
  `,
})
export class DaisyPasswordGenerator implements FormValueControl<string | null> {
  label = input<string>('');
  value = model<string | null>(null);
  invalid = input<boolean>(false);
  required = input<boolean>(false);

  show = signal<boolean>(false);

  generatorFlag = signal<boolean>(false);

  toggle() {
    this.show.update((value) => !value);
  }

  reset() {
    this.value.set(null);
  }

  generate(event: NzSliderValue) {
    let passwordLength: number = 8;

    if (typeof event === 'number') {
      passwordLength = event;
    } else {
      passwordLength = event[0];
    }

    var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var password = '';
    for (var i = 0; i < passwordLength; i++) {
      var ind = Math.floor(Math.random() * char.length);
      password += char[ind];
    }
    this.value.set(password);
  }

  formatter(value: number): string {
    return `${value}`;
  }
}
