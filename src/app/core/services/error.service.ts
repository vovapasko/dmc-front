import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ServerError } from '@models/responses/server/error';

/**
 * This service for store global error
 */

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  error$ = new Subject<ServerError>();

  constructor() {}

  set error(error: ServerError) {
    this.error$.next(error);
  }

  public clear(): void {
    this.error$.next(null);
  }
}
