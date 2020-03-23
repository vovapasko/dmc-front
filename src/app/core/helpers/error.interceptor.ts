import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor() {
    }

    /**
     * Handle and process error from server
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            const error = err.error.message || err.statusText;
            const status = err.status;
            return this.error(error, status);
        }));
    }

    /**
     * Handling errors
     */
    error(message, status): Observable<never> {
        return throwError({status, error: {message}});
    }
}
