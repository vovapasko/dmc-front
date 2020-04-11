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

    public error$: Subject<boolean>;

    constructor() { }

    set error(error: ServerError) {
        this.error$.next(!!error);
    }

    clear() {
        this.error$.next(null);
    }
}
