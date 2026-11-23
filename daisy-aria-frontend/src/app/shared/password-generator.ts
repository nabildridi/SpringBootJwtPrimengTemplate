import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  OnInit,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';
import {
  ForHoverCard,
  ForHoverCardArrow,
  ForHoverCardContent,
  ForHoverCardTrigger,
} from 'forty-cdk/hover-card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule, ForHoverCard, ForHoverCardTrigger, ForHoverCardContent, ForHoverCardArrow],
  selector: 'n-password-generator',
  template: `
    <span forHoverCard #card="forHoverCard" side="top">
      <div forHoverCardTrigger class="relative w-full">
        <span class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
          <i class="bx bx-key" [ariaInvalid]="invalid()"></i>
        </span>

        <input
          [type]="show() ? 'text' : 'password'"
          [value]="value()"
          (input)="value.set($event.target.value)"
          [ariaInvalid]="invalid()"
          [id]="inputId"
          placeholder=" "
          class="peer block w-full appearance-none rounded-md border border-base-200 bg-white  dark:bg-base-300
             px-3 ps-11 pe-11 pb-2.5 pt-6 text-sm 
             focus:border-primary focus:outline-none focus:ring-0 hover:border-primary"
        />

        <label
          [for]="inputId"
          class="pointer-events-none absolute start-11 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm 
             duration-200
             peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
             peer-focus:-translate-y-3 peer-focus:scale-75 text-dark dark:text-white"
          [class.requ]="required()"
          >{{ label() }}
        </label>

        <span class="cursor-pointer absolute inset-y-0 end-0 flex items-center pe-3.5 space-x-2">
          @if (value()) {
            <i class="bx bx-x cursor-pointer" (click)="clear()"></i>
          }

          <i
            [class]="show() ? 'bx bx-eye-slash' : 'bx bx-eye'"
            class="cursor-pointer"
            (click)="toggle()"
          ></i>
        </span>
      </div>

      @if (card.open()) {
        <div forHoverCardContent class="card w-96 bg-base-100 shadow-sm">
          <div class="card-body">
            <h2 class="card-title">Générer</h2>
            <div class="w-full max-w-xs">
              <input
                type="range"
                min="8"
                max="20"
                [value]="passwordLength"
                class="range"
                step="1"
                (change)="generate($event.target.value)"
              />
              <div class="flex justify-between px-2.5 mt-2 text-xs">
                @for (i of indexes; track $index) {
                  <span>|</span>
                }
              </div>
              <div class="flex justify-between px-2.5 mt-2 text-xs">
                @for (i of indexes; track $index) {
                  <span>{{ i }}</span>
                }
              </div>
            </div>
          </div>
          <span forHoverCardArrow class="hovercard-arrow"></span>
        </div>
      }
    </span>
  `,
  styles: `
    .hovercard-arrow {
      width: 11px;
      height: 11px;
      border-top: 1px solid var(--ex-border, #e5e0d6);
      border-left: 1px solid var(--ex-border, #e5e0d6);
      --for-floating-arrow-offset: -6px;
    }

    .hovercard-arrow[data-side='bottom'] {
      transform: rotate(45deg);
    }

    .hovercard-arrow[data-side='top'] {
      transform: rotate(225deg);
    }

    .hovercard-arrow[data-side='left'] {
      transform: rotate(135deg);
    }

    .hovercard-arrow[data-side='right'] {
      transform: rotate(-45deg);
    }
  `,
})
export class DaisyPasswordGenerator implements FormValueControl<string | null>, OnInit {
  label = input<string>('');
  value = model<string | null>(null);
  invalid = input<boolean>(false);
  required = input<boolean>(false);

  show = signal<boolean>(false);
  passwordLength: number = 8;

  inputId: string = uuidv4();

  indexes: number[] = [];

  ngOnInit(): void {
    for (let i = 8; i < 21; i++) {
      this.indexes.push(i);
    }
  }

  toggle() {
    this.show.update((value) => !value);
  }

  clear() {
    this.value.set(null);
  }

  generate(meter: string) {
    console.log(meter);

    this.passwordLength = Number(meter);

    var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var password = '';
    for (var i = 0; i < this.passwordLength; i++) {
      var ind = Math.floor(Math.random() * char.length);
      password += char[ind];
    }
    this.value.set(password);
  }
}
