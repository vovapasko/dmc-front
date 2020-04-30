import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * This service for handle global loading
 */

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading$: Subject<boolean> = new Subject();

  constructor() {}

  public startLoading(): void {
    this.loading$.next(true);
  }

  public stopLoading(): void {
    this.loading$.next(false);
  }
}
