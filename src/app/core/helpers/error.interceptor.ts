import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NotificationService} from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private notificationService: NotificationService) {
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
        if (errors) {
            const errorsTitles = Object.keys(errors);
            errorsTitles.forEach(title => this.notificationService.error(title, errors[title]));
            return throwError({status, errors});
        }
        return throwError({status, message: 'Something went wrong'});
    }
}
