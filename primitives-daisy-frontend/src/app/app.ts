import { Component, effect, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalsService } from './services/signals/signals.service';
import { LayoutService } from './services/layout/layout.service';

@Component({
  imports: [RouterOutlet, NgxSpinnerModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  uiBlocked = signal<boolean>(false);

  constructor(
    private signalsService: SignalsService,
    private ngxSpinnerService: NgxSpinnerService,
    private layoutService: LayoutService,
  ) {
    layoutService.init();
    effect(() => {
      this.update(this.signalsService.pendingRequests());
    });
  }

  ngOnInit(): void {}

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
