import { Component, input, model, OnInit, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'n-image-checkox',
  imports: [],
  styles: `
    .checkbox-group {
      display: flex;
      flex-wrap: wrap;
      margin-left: auto;
      margin-right: auto;
      user-select: none;
      & > * {
        margin: 0.5rem 0.5rem;
      }
    }

    .checkbox-group-legend {
      font-size: 1.5rem;
      font-weight: 700;
      color: #9c9c9c;
      text-align: center;
      line-height: 1.125;
      margin-bottom: 1.25rem;
    }

    .checkbox-input {
      clip: rect(0 0 0 0);
      clip-path: inset(100%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;

      &:checked + .checkbox-tile {
        border-color: #2260ff;
        box-shadow: 0 5px 10px rgba(#000, 0.1);
        color: #2260ff;
        &:before {
          transform: scale(1);
          opacity: 1;
          background-color: #2260ff;
          border-color: #2260ff;
        }

        .checkbox-icon,
        .checkbox-label {
          color: #2260ff;
        }
      }

      &:focus + .checkbox-tile {
        border-color: #2260ff;
        box-shadow:
          0 5px 10px rgba(#000, 0.1),
          0 0 0 4px #b5c9fc;
        &:before {
          transform: scale(1);
          opacity: 1;
        }
      }
    }

    .checkbox-tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 7rem;
      min-height: 7rem;
      border-radius: 0.5rem;
      border: 2px solid #b5bfd9;
      background-color: #fff;
      box-shadow: 0 5px 10px rgba(#000, 0.1);
      transition: 0.15s ease;
      cursor: pointer;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        display: block;
        width: 1.25rem;
        height: 1.25rem;
        border: 2px solid #b5bfd9;
        background-color: #fff;
        border-radius: 50%;
        top: 0.25rem;
        left: 0.25rem;
        opacity: 0;
        transform: scale(0);
        transition: 0.25s ease;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192' fill='%23FFFFFF' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpolyline points='216 72.005 104 184 48 128.005' fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'%3E%3C/polyline%3E%3C/svg%3E");
        background-size: 12px;
        background-repeat: no-repeat;
        background-position: 50% 50%;
      }

      &:hover {
        border-color: #2260ff;
        &:before {
          transform: scale(1);
          opacity: 1;
        }
      }
    }

    .checkbox-icon {
      margin-top: 25px;
      margin-left: 15px;
      margin-right: 15px;
      transition: 0.375s ease;
      color: #494949;
      svg {
        width: 3rem;
        height: 3rem;
      }
    }

    .checkbox-label {
      color: #707070;
      transition: 0.375s ease;
      text-align: center;
    }
  `,
  template: `
    <div class="checkbox-group">
      <label class="checkbox-wrapper">
        <input type="checkbox" class="checkbox-input" />
        <span class="checkbox-tile">
          <span class="checkbox-icon">
            <img [src]="imageSrc()" width="130" height="130" />
          </span>
          <span class="checkbox-label">Discord</span>
        </span>
      </label>
    </div>
  `,
})
export class DaisyImageCheckbox implements FormValueControl<boolean | null>, OnInit {
  value = model<boolean | null>(null);
  label = input<string>('');
  imageSrc = input<string>('text');
  invalid = input<boolean>(false);
  required = input<boolean>(false);

  inputId: string = uuidv4();

  ngOnInit(): void {}

  toggle() {
    this.value.update((value) => !value);
    console.log(this.value());
  }
}
