import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {ServerError} from '../models/responses/server/error';
import {ErrorHandler} from "../helpers/error-handler";

/**
 * This interceptor for process errors from server in rxjs way
 */

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private errorHandler: ErrorHandler
    ) {
    }

    /**
     * Handle and process error from server
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            const errors = err.error.errors;
            const status = err.status;
            return this.error(errors, status);
        }));
    }

    /**
     * Handling errors
     */
    error(errors, status): Observable<never> {
        let errorEntity: ServerError = {status, error: {message: 'Something went wrong'}};
        if (errors) {
            const errorsTitles = Object.keys(errors);
            errorEntity = {status, error: {message: errorsTitles.toString()}, errors};
            this.errorHandler.handle(errorEntity);
            return throwError(errorEntity);
        }
        return throwError(errorEntity);
    }
}
