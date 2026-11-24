import { Component, input, model, OnInit, Signal, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { v4 as uuidv4 } from 'uuid';
import {
  type ForDragDropEvent,
  ForDragHandle,
  ForDragPlaceholder,
  ForDraggable,
  ForDropList,
  moveItemInArray,
} from 'forty-cdk/drag-drop';

@Component({
  selector: 'n-pick-list',
  imports: [ForDropList, ForDraggable, ForDragHandle, ForDragPlaceholder],
  template: `
    <fieldset class="fieldset  rounded-box w-full border-2">
      <legend class="fieldset-legend" [class.requ]="required()">{{ label() }}</legend>

      <div class="flex w-full">
        <div class="card bg-base-300 rounded-box grid  grow place-items-center">content</div>
        <div class="divider divider-horizontal"><i class="bx bx-arrow-left-right"></i></div>
        <div class="card bg-base-300 rounded-box grow">
          <ul
            forDropList
            class="list bg-base-100 rounded-box shadow-md w-full border-2 border-accent"
            [liveSort]="true"
            [animateReorder]="true"
            (dragDrop)="onDrop($event)"
          >
            @for (task of tasks(); track task.id) {
              <li
                forDraggable
                [dragData]="task"
                class="list-row  m-2 p-2 rounded-box border cursor-grabbing"
              >
                <div forDragHandle class="flex w-full flex-row item items-center space-x-5">
                  <div class="flex">
                    <span aria-hidden="true" class="text-base font-bold">⠿</span>
                  </div>
                  <div class="flex">
                    <span aria-hidden="true" class="text-base font-bold">{{ $index + 1 }}</span>
                  </div>
                  <div class="flex">
                    <span class="text-base font-bold">{{ task.label }}</span>
                  </div>
                  <div class="flex">
                    <ng-template forDragPlaceholder>
                      <div class="placeholder   m-4"></div>
                    </ng-template>
                  </div>
                </div>
              </li>
            }
          </ul>
        </div>
      </div>
    </fieldset>
  `,
  styles: `
    .placeholder {
      height: 2.9rem;
      border: 2px dashed var(--ex-accent, #0e7c6b);
      border-radius: var(--ex-radius-sm, 14px);
      background: color-mix(in srgb, var(--ex-accent, #0e7c6b) 10%, transparent);
    }

    .item[data-drag-animating] {
      transition: transform 0.2s ease;
    }

    [data-for-drag-preview][data-settling] {
      transition: transform 0.2s ease;
    }

    @media (prefers-reduced-motion: reduce) {
      .item[data-drag-animating],
      [data-for-drag-preview][data-settling] {
        transition: none;
      }
    }
  `,
})
export class DaisyPickList implements FormValueControl<string[] | null>, OnInit {
  value = model<string[] | null>(null);
  label = input<string>('');
  listItems = input<any[] | null>(null);
  invalid = input<boolean>(false);
  required = input<boolean>(false);

  itemsList = signal<any[]>([]);
  inputName: string = uuidv4();

  constructor() {}

  protected readonly tasks = signal<readonly any[]>([
    { id: 'a', label: 'Draft the release notes' },
    { id: 'b', label: 'Review open pull requests' },
    { id: 'c', label: 'Update the changelog' },
    { id: 'd', label: 'Publish the npm package' },
    { id: 'e', label: 'Announce on the forum' },
  ]);

  protected onDrop(event: ForDragDropEvent): void {
    this.tasks.update((tasks) => moveItemInArray(tasks, event.previousIndex, event.currentIndex));
  }

  ngOnInit(): void {
    this.itemsList.set(this.listItems()!);
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
