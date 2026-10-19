import { TuiRoot } from '@taiga-ui/core';
import { Component, effect, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalsService } from './services/signals/signals.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, TuiRoot, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  uiBlocked: WritableSignal<boolean> = signal(false);

  constructor(
    private signalsService: SignalsService,
    private ngxSpinnerService: NgxSpinnerService,
  ) {
    effect(() => {
      this.update(this.signalsService.pendingRequests());
    });
  }
  update(httpCount: number) {
    if (httpCount > 0 && this.uiBlocked() == false) {
      this.uiBlocked.set(true);
    }

    if (httpCount == 0 && this.uiBlocked() == true) {
      this.uiBlocked.set(false);
    }

    if (this.uiBlocked() == true) {
      this.ngxSpinnerService.show();
    } else {
      this.ngxSpinnerService.hide();
    }
  }
}
