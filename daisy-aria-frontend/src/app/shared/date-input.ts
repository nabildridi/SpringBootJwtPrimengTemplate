import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { v4 as uuidv4 } from 'uuid';
import { type CalendarDate } from '@internationalized/date';
import {
  ForCalendar,
  ForCalendarCell,
  ForCalendarGrid,
  ForCalendarGridHeader,
  ForCalendarHeading,
  ForCalendarNextButton,
  ForCalendarPrevButton,
} from 'forty-cdk/calendar';
import {
  ForDatePicker,
  ForDatePickerContent,
  ForDatePickerTrigger,
  ForDatePickerValue,
} from 'forty-cdk/date-picker';
import { provideInternationalizedDateAdapter } from 'forty-cdk/internationalized-date';

@Component({
  selector: 'n-date',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    ForDatePicker,
    ForDatePickerTrigger,
    ForDatePickerValue,
    ForDatePickerContent,
    ForCalendar,
    ForCalendarHeading,
    ForCalendarPrevButton,
    ForCalendarNextButton,
    ForCalendarGrid,
    ForCalendarGridHeader,
    ForCalendarCell,
  ],
  providers: [...provideInternationalizedDateAdapter()],
  template: `
    <div forDatePicker #picker="forDatePicker" [(value)]="date" placeholder="Pick a date">
      <div forDatePickerTrigger class="w-full h-16">
        <span
          forDatePickerValue
          class="date-picker-value"
          [id]="inputId"
          [ariaInvalid]="invalid()"
        ></span>
        <i class="bx bx-chevron-down"></i>

        <label
          [for]="inputId"
          class="pointer-events-none absolute start-11 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm 
             duration-200
             peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
             peer-focus:-translate-y-3 peer-focus:scale-75 text-dark dark:text-white"
          [class.requ]="required()"
          >{{ label() }}
        </label>
      </div>

      @if (picker.open()) {
        <div forDatePickerContent class="date-picker-popover" animate.enter="date-picker-pop-in">
          <div forCalendar class="date-picker-cal" [(value)]="date">
            <header class="date-picker-head">
              <button forCalendarPrevButton class="date-picker-nav" [ariaLabel]="'Previous month'">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="m15.75 19.5-7.5-7.5 7.5-7.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <h2 forCalendarHeading #heading="forCalendarHeading" class="date-picker-title">
                {{ heading.label() }}
              </h2>
              <button forCalendarNextButton class="date-picker-nav" [ariaLabel]="'Next month'">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </header>

            <table forCalendarGrid #grid="forCalendarGrid" class="date-picker-grid">
              <thead forCalendarGridHeader>
                <tr>
                  @for (day of grid.weekDays(); track day.key) {
                    <th scope="col" class="date-picker-weekday" [attr.aria-label]="day.long">
                      {{ day.narrow }}
                    </th>
                  }
                </tr>
              </thead>
              <tbody>
                @for (week of grid.weeks(); track week.key) {
                  <tr>
                    @for (cell of week.days; track cell.key) {
                      <td forCalendarCell class="date-picker-cell" [date]="cell.date">
                        {{ cell.label }}
                      </td>
                    }
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  `,
})
export class DaisyDateInput implements FormValueControl<Date | null>, OnInit {
  value = model<Date | null>(null);
  label = input<string>('');
  invalid = input<boolean>(false);
  required = input<boolean>(false);

  icon = input<string | null>(null);

  inputId: string = uuidv4();

  date = signal<CalendarDate | null>(null);

  ngOnInit(): void {}

  clear() {
    this.value.set(null);
  }
}
