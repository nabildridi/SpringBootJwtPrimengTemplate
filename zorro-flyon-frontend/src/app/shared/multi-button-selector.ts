import { Component, input, model, OnInit, Signal, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ListsService } from '../services/configuration/lists-service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'n-multi-button-selector',
  imports: [NzSelectModule, FormsModule],
  template: `
    <fieldset class="fieldset  rounded-box w-full border-2">
      <legend class="fieldset-legend" [class.requ]="required()">{{ label() }}</legend>

      <div class="flex flex-row flex-wrap gap-4 m-2">
        @for (option of itemsList(); track $index) {
          <label
            class="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-stone-200 px-4 py-3  has-checked:border-teal-700 dark:has-checked:bg-teal-700 has-checked:bg-teal-50 has-disabled:cursor-not-allowed has-disabled:bg-stone-50 has-disabled:text-stone-500"
          >
            <input
              type="checkbox"
              [name]="inputName"
              (change)="toggle($event, option)"
              [checked]="itemsList().includes(option.value)"
              class="peer h-6 w-6 shrink-0 appearance-none rounded-md border-2 border-gray-400 
           transition
           checked:border-primary checked:bg-primary
             checked:ring-2 checked:ring-inset checked:ring-white
           checked:shadow-[0_0_0_2px_theme(colors.blue.600)]
           focus-visible:outline-none focus-visible:ring-offset-2"
            />
            <span class="text-black dark:text-gray-100 text-base select-none">{{
              option.label
            }}</span>
          </label>
        }
      </div>
    </fieldset>
  `,
})
export class DaisyMultiButtonSelector implements FormValueControl<string[] | null>, OnInit {
  value = model<string[] | null>(null);
  label = input<string>('');
  listId = input<string | null>(null);
  listItems = input<any[] | null>(null);
  invalid = input<boolean>(false);
  required = input<boolean>(false);

  itemsList = signal<any[]>([]);
  inputName: string = uuidv4();

  constructor(private listsService: ListsService) {}

  ngOnInit(): void {
    if (this.listId() != null) {
      this.itemsList.set(this.listsService.getList(this.listId()!));
    }
    if (this.listItems() != null) {
      this.itemsList.set(this.listItems()!);
    }
  }

  toggle(event: Event, option: any) {
    if (this.value() == null) {
      this.value.set([]);
    }

    if (this.value()?.includes(option.value)) {
      this.value.update((prev) => prev!.filter((c) => c !== option.value));
    } else {
      this.value.update((prev) => [...prev!, option.value]);
    }
  }
}
