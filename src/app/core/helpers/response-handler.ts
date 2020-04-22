import {Injectable} from '@angular/core';

import {NotificationType} from '../models/instances/notification';
import {NotificationService} from '../services/notification.service';
import {ErrorService} from '../services/error.service';
import {ServerResponse} from '../models/responses/server/response';

/**
 * This service for handle response from server, convert response body from snake case to camel case and notify about success
 */

@Injectable({
    providedIn: 'root'
})
export class ResponseHandler {
    constructor(
        private notificationService: NotificationService,
        private errorService: ErrorService
    ) {
    }

    /**
     *  Handle successful response
     */
    public handle(response: ServerResponse) {
        // notify about success
        if (response.success) {
            const message = response.message ? response.message.message : '';
            const title = 'success';
            return this.notificationService.notify(NotificationType.success, title, message);
        }
        // clear any errors
        this.errorService.clear();
        // returns successful
        return response.success;
    }
}
