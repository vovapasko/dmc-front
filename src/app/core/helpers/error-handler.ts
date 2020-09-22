import { Injectable } from '@angular/core';

import { NotificationType } from '@models/instances/notification';
import { NotificationService } from '@services/notification.service';
import { ErrorService } from '@services/error.service';
import { ServerError } from '@models/responses/server/error';
import { errorTitle } from '@constants/error';

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
  public handle(serverError: ServerError): ServerError {
    this.notificationService.notify(NotificationType.error, errorTitle, serverError.error.message);
    this.errorService.error = serverError;
    return serverError;
  }
}
