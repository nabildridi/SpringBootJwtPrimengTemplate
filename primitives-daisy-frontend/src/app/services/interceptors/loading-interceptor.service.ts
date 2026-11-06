import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SignalsService } from '../signals/signals.service';
import { StorageService } from '../storage/storage.service';
import { ToastService } from '../toast/toast.service';

@Injectable()
export class LoadingInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private signalsService: SignalsService,
    private storageService: StorageService,
    private toastService: ToastService,
  ) {}

  addToken(req: HttpRequest<any>): HttpRequest<any> {
    //test if url is to security or application
    if (!req.url.includes('/private/')) {
      return req;
    } else {
      let token = this.storageService.getAccessToken();
      return req.clone({
        headers: req.headers.set('AUTHORIZATION', 'Bearer ' + token),
      });
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.signalsService.pendingRequestsAdd();

    return next.handle(this.addToken(req)).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        let httpStatus: number = err.status;

        if (httpStatus == 401 || httpStatus == 403) {
          this.router.navigate(['/login']);
        } else if (httpStatus == 404 || httpStatus == 503 || httpStatus == 502 || httpStatus == 0) {
          this.toastService.showError('Server down');
        }
        return throwError(() => err);
      }),
      finalize(() => {
        this.signalsService.pendingRequestsSubstract();
      }),
    );
  }
}
