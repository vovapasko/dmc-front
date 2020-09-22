import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LoadingService } from '@services/loading.service';

/**
 * This interceptor for process requests from server in rxjs way
 */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private loadingScreenService: LoadingService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let lastResponse: HttpEvent<any>;
    let error: HttpErrorResponse;


    return next.handle(request)
      .pipe(
        tap((response: HttpEvent<any>) => {
          lastResponse = response;
        }),
        catchError((err: any) => {
          error = err;
          return throwError(err);
        }),
        finalize(() => {
          if (lastResponse.type === HttpEventType.Sent && !error) {
            // last response type was 0, and we haven't received an error
            this.loadingScreenService.stopLoading();
            return next.handle(request.clone());
          }
        })
      );
  }
}
