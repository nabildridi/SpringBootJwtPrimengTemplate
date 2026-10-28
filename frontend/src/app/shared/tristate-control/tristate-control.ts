import { Component, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

export type TriState = boolean | null;

@Component({
  imports: [],
  selector: 'app-tristate-control',
  styleUrl: './tristate-control.css',
  templateUrl: './tristate-control.html',
})
export class TristateControl implements FormValueControl<TriState> {
  value = model<TriState>(null);
  trueLabel = input.required<string>();
  falseLabel = input.required<string>();
  nullLabel = input.required<string>();

  setValue(value: TriState) {
    this.value.update((item: TriState) => (item = value));
  }
}
