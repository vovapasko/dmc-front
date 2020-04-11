import {Injectable} from '@angular/core';

import {NotificationType} from '../models/instances/notification';
import {NotificationService} from '../services/notification.service';
import {ErrorService} from '../services/error.service';
import {ServerError} from '../models/responses/serverError';

/**
 * This service for handling errors from server, notify user about error
 */

@Injectable({
    providedIn: 'root'
})
export class ErrorHandler {
    constructor(
        private notificationService: NotificationService,
        private errorService: ErrorService
    ) {
    }

    /**
     * Handle error.
     */
    public handle(error: ServerError): ServerError {
        const errors = error.errors;
        const errorsTitles = Object.keys(errors);
        errorsTitles.forEach(title => this.notificationService.notify(NotificationType.error, title, errors[title]));
        this.errorService.error = error;
        return error;
    }
}
