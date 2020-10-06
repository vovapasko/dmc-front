import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ServerError } from '@models/responses/server/error';
import { ErrorHandler } from '@helpers/error-handler';

/**
 * This interceptor for process errors from server in rxjs way
 */

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorHandler: ErrorHandler) {}

  /**
   * Handle and process error from server
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        const error = err.error;
        const status = err.status;
        return this.processError(error, status);
      })
    );
  }

  /**
   * Handling errors
   */
  public processError(error: object, status: number): Observable<never> {
    const errorEntity: ServerError = { status, error };
    this.errorHandler.handle(errorEntity);
    return throwError(errorEntity);
  }
}
