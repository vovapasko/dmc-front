import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * This service for handle global loading
 */

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    loading$: Subject<boolean> = new Subject();

    constructor() { }

    startLoading() {
        this.loading$.next(true);
    }

    stopLoading() {
        this.loading$.next(false);
    }
}
