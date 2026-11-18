import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject, Service } from '@angular/core';

@Service()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    if (error instanceof HttpErrorResponse && error.status >= 500) {
      window.location.href = '/server-error.html';
    } else {
      throw error;
    }
  }
}
