import { Component, input, model, OnInit, Signal, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import * as lod from 'lodash';
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
    <fieldset class="fieldset  rounded-box w-full border-2 p-2">
      <legend class="fieldset-legend" [class.requ]="required()">{{ label() }}</legend>

      <div class="flex w-full">
        <div class="card bg-base-300 rounded-box w-6/12 place-items-center">
          <div class="flex flex-row flex-wrap gap-2 m-1">
            @for (sourceItem of sourceList(); track $index) {
              <div class="badge badge-primary cursor-pointer" (click)="addToTarget($index)">
                <i class="bx bx-finger-touch"></i>
                {{ sourceItem.label }}
              </div>
            }
          </div>
        </div>
        <div class="divider divider-horizontal w-1/12"><i class="bx bx-arrow-left-right"></i></div>
        <div class="card bg-base-300 rounded-box w-5/12">
          <ul forDropList [liveSort]="true" [animateReorder]="true" (dragDrop)="onDrop($event)">
            @for (targetItem of targetList(); track targetItem.value) {
              <li forDraggable [dragData]="targetItem" class="  m-2 p-2 rounded-box border ">
                <div forDragHandle class="flex w-full justify-between item cursor-grabbing">
                  <div class="flex items-center space-x-3 ">
                    <span aria-hidden="true" class="text-base font-bold">⠿</span>

                    <span class="text-base font-bold">{{ $index + 1 }}</span>

                    <span class="text-base font-bold">{{ targetItem.label }}</span>

                    <ng-template forDragPlaceholder>
                      <div class="h-12 border-2 border-dashed border-accent rounded-sm m-4"></div>
                    </ng-template>
                  </div>
                  <div class="flex">
                    <button
                      type="button"
                      class="daisy-btn btn-circle"
                      (click)="returnItemToSource($index)"
                    >
                      <i class="bx bx-x"></i>
                    </button>
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

  sourceList = signal<any[]>([]);
  targetList = signal<any[]>([]);

  constructor() {}

  protected onDrop(event: ForDragDropEvent): void {
    this.targetList.update((targets) =>
      moveItemInArray(targets, event.previousIndex, event.currentIndex),
    );
  }

  ngOnInit(): void {
    this.sourceList.set(this.listItems()!);
    if (this.value() != null && this.value()!.length > 0) {
      for (let selected of this.value()!) {
        //find item in source
        let itemToMove = lod.remove(this.sourceList(), function (o) {
          return o.value === selected;
        });
        this.targetList.update((list) => [...list, itemToMove[0]]);
      }
    }
  }

  returnItemToSource(index: number) {
    let itemToMove = this.targetList()[index];
    this.targetList.update((list) => list.filter((c, i) => i !== index));
    this.sourceList.update((list) => [...list, itemToMove]);
    this.sourceList.update((list) => list.sort((a, b) => a.label.localeCompare(b.label)));
    this.updateModel();
  }

  addToTarget(index: number) {
    let itemToMove = this.sourceList()[index];
    this.sourceList.update((list) => list.filter((c, i) => i !== index));
    this.targetList.update((list) => [...list, itemToMove]);
    this.updateModel();
  }

  updateModel() {
    this.value.set([]);
    for (let item of this.targetList()!) {
      this.value.update((list) => [...list!, item.value]);
    }
  }
}
