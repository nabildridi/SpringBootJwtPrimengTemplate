import { Component, inject, Inject } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  imports: [],
  selector: 'app-receive-send-modal',
  styleUrl: './receive-send-modal.css',
  templateUrl: './receive-send-modal.html',
})
export class ReceiveSendModal {
  constructor(
    @Inject(NZ_MODAL_DATA) public data: any,
    private modalRef: NzModalRef,
  ) {}

  close() {
    this.modalRef.destroy();
  }
}
