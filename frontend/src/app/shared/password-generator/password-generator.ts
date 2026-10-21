import { Component, input, model, output, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { TuiIcon, TuiInput } from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';
import { TuiInputSlider, TuiTooltip } from '@taiga-ui/kit';

import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, TuiIcon, TuiInput, TuiPassword, TuiTooltip, TuiInputSlider],
  selector: 'app-password-generator',
  styleUrl: './password-generator.css',
  templateUrl: './password-generator.html',
})
export class PasswordGenerator implements FormValueControl<string | null> {
  label = input<string>('');
  value = model<string | null>(null);
  invalid = input<boolean>(false);
  touched = input<boolean>(false);
  touch = output<void>();

  generatorFlag = signal<boolean>(false);
  passwordLength: number = 12;

  toggle() {
    this.generatorFlag.update((value) => !value);
  }

  generate() {
    var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var password = '';
    for (var i = 0; i < this.passwordLength; i++) {
      var ind = Math.floor(Math.random() * char.length);
      password += char[ind];
    }
    this.value.set(password);
  }
}
