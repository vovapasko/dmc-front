import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import numbers from '@constants/numbers';
import { StartLoading, StopLoading } from '@store/actions/loading.actions';
import { Store } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';

/**
 * This interceptor for control que of requests and set loading marker
 */

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptor {
  activeRequests = 0;

  constructor(private store: Store<IAppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.activeRequests === numbers.zero) {
      const payload = {data: {value: true}};
      this.store.dispatch(new StartLoading(payload));
    }

    this.activeRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === numbers.zero) {
          const payload = {data: {value: false}};
          this.store.dispatch(new StopLoading(payload));
        }
      })
    );
  }
}
