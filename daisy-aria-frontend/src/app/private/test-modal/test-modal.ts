import { Component } from '@angular/core';
import {
  FOR_DIALOG_CONTRACT,
  ForDialogBackdrop,
  type ForDialogContract,
  injectDialogData,
  injectDialogRef,
} from 'forty-cdk/dialog';

@Component({
  imports: [ForDialogBackdrop],
  selector: 'app-test-modal',
  styleUrl: './test-modal.css',
  templateUrl: './test-modal.html',
})
export class TestModal {
  declare readonly [FOR_DIALOG_CONTRACT]: ForDialogContract<any, any>;
  readonly data = injectDialogData<any>();
  readonly ref = injectDialogRef<TestModal>();

  close() {
    this.ref.close();
  }
}
