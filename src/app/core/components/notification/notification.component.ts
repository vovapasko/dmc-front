import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { NotificationService } from '@services/notification.service';
import { Notification, NotificationType } from '@models/instances/notification';

/**
 * This component for notify user
 */

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notificationTypes = NotificationType;
  notifications$: BehaviorSubject<Array<Notification>>;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.initSubscriptions();
  }

  /**
   * Get notifications
   */
  initSubscriptions(): void {
    this.notifications$ = this.notificationService.notifications$;
  }

  /**
   * Close notification by id
   */
  close(notification: Notification): void {
    this.notificationService.close(notification);
  }
}
