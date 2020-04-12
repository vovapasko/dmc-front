import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import {ServerError} from '../models/responses/serverError';

/**
 * This service for store global error
 */

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    error$ = new Subject();

    constructor() { }

    set error(error: ServerError) {
        this.error$.next(error);
    }

    clear() {
        this.error$.next(null);
    }
}
