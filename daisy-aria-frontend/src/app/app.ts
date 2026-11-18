import { Component, effect, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignalsService } from './services/signals/signals.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LayoutService } from './services/layout/layout.service';

@Component({
  imports: [RouterOutlet, CommonModule, NgxSpinnerModule],
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
    private router: Router,
  ) {
    layoutService.init();
    effect(() => {
      this.update(this.signalsService.pendingRequests());
    });
  }

  ngOnInit() {}

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
