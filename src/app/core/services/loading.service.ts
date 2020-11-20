import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { SetLoadingPayload } from '@models/payloads/loading/set';

/**
 * This service for handle global loading
 */

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading$: Subject<boolean> = new Subject();

  constructor() {}

  public startLoading(payload: SetLoadingPayload): Observable<SetLoadingPayload> {
    this.loading$.next(payload.data.value);
    return of(payload);
  }

  public stopLoading(payload: SetLoadingPayload): Observable<SetLoadingPayload> {
    this.loading$.next(payload.data.value);
    return of(payload);
  }
}
