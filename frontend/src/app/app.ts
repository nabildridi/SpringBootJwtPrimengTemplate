import { Component, effect, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHttpService } from './services/http/app-http.service';
import { SignalsService } from './services/signals/signals.service';
import { CommonModule } from '@angular/common';
import { BlockUIModule } from '@openng/optimus-ui/blockui';
import { ProgressSpinnerModule } from '@openng/optimus-ui/progressspinner';
import { ToastModule } from '@openng/optimus-ui/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, BlockUIModule, ProgressSpinnerModule, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  uiBlocked: WritableSignal<boolean> = signal(false);

  constructor(private signalsService: SignalsService) {
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
  }
}
