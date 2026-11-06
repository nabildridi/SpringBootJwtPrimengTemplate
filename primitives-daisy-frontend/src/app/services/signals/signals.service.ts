import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignalsService {
  public pendingRequests: WritableSignal<number> = signal<number>(0);
  public serverDown: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {}

  public pendingRequestsAdd() {
    this.pendingRequests.update((pendingRequests) => pendingRequests + 1);
  }

  public pendingRequestsSubstract() {
    this.pendingRequests.update((pendingRequests) => pendingRequests - 1);
  }
}
