import {Injectable} from '@angular/core';

import {NotificationType} from '../models/instances/notification';
import {NotificationService} from '../services/notification.service';
import {ErrorService} from '../services/error.service';
import {ServerResponse} from '../models/responses/serverResponse';

@Injectable({
    providedIn: 'root'
})
export default class ResponseHandler {
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
            return this.notificationService.notify(NotificationType.success, 'success', response.message.message);
        }
        // clear any errors
        this.errorService.clear();
        // returns successful
        return response.success;
    }
}
