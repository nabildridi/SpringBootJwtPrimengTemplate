import { ChangeDetectionStrategy, Component, input, model, OnInit, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { v4 as uuidv4 } from 'uuid';
import { ForFileUpload, ForFileUploadInput, ForFileUploadTrigger } from 'forty-cdk/file-upload';

@Component({
  selector: 'n-file-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ForFileUpload, ForFileUploadInput, ForFileUploadTrigger],
  template: `
    <div class="flex flex-col w-full">
      <!-- input div -->

      <div
        forFileUpload
        accept="image/*"
        (filesChange)="onFiles($event)"
        class="flex items-center justify-center w-full"
      >
        <label
          [for]="inputId"
          class="flex flex-col items-center justify-center w-full  bg-base-100 border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium"
        >
          <div class="flex flex-col items-center justify-center text-body pt-5 pb-6">
            <i class="bx bx-arrow-in-up-square-half text-3xl"></i>
            <p class="mb-2 text-sm">
              <button forFileUploadTrigger type="button" class="btn btn-ghost font-semibold">
                Click to upload or drag and drop
              </button>
            </p>
            <p class="text-xs">{{ label() }}</p>
          </div>
          <input
            forFileUploadInput
            [id]="inputId"
            class="sr-only"
            tabindex="-1"
            aria-hidden="true"
          />
        </label>
      </div>

      <!-- preview div -->
      <div class="flex w-full">
        @if (value() != null) {
          <ul class="w-full list bg-base-100 rounded-box shadow-md">
            <li class="list-row">
              <div>
                <div class="size-16 aspect-video overflow-hidden rounded-lg ">
                  <img [src]="preview()" alt="Aperçu" class="h-full w-full object-cover" />
                </div>
              </div>
              <div>
                <div>{{ value()!.name }}</div>
                <div class="text-xs uppercase font-semibold opacity-60">
                  {{ sizeLabel(value()!.size) }}
                </div>
              </div>
              <button type="button" class="btn btn-square">
                <i class="bx bx-x" (click)="clear()"></i>
              </button>
            </li>
          </ul>
        }
      </div>
    </div>
  `,
})
export class DaisyFileInput implements FormValueControl<File | null>, OnInit {
  value = model<File | null>(null);
  label = input<string>('');
  invalid = input<boolean>(false);
  required = input<boolean>(false);
  icon = input<string | null>(null);

  inputId: string = uuidv4();
  preview = signal<string | ArrayBuffer | null>('');

  protected onFiles(list: FileList): void {
    if (list.length > 0) {
      this.value.set(list[0]);
      this.imageToUrl(list[0]);
    }
  }

  protected sizeLabel(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  ngOnInit(): void {}

  protected clear() {
    this.value.set(null);
    this.preview.set(null);
  }

  protected imageToUrl(file: File) {
    const reader = new FileReader();

    reader.onload = (e) => {
      // convert image file to base64 string
      this.preview.set(reader.result);
    };

    reader.readAsDataURL(file);
  }
}
