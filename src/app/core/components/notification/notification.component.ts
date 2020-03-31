import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {Notification, NotificationType} from '../../models/instances/notification';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
    notificationTypes = NotificationType;
    notifications: Notification[] = [];
    private subscription: Subscription;

    constructor(private notificationSvc: NotificationService) {
    }

    ngOnInit() {
        this.subscription = this.notificationSvc.getObservable().subscribe(notification => this._addNotification(notification));
    }

    /**
     * Store notification for a while
     */
    private _addNotification(notification: Notification) {
        this.notifications.push(notification);

        if (notification.timeout !== 0) {
            setTimeout(() => this.close(notification), notification.timeout);

        }
    }

    /**
     * Close notification by id
     */
    close(notification: Notification) {
        this.notifications = this.notifications.filter(notif => notif.id !== notification.id);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
