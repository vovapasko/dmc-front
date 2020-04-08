import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {Notification, NotificationType} from '../../models/instances/notification';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
    notificationTypes = NotificationType;
    notifications$: BehaviorSubject<Array<Notification>>;

    constructor(private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.notifications$ = this.notificationService.notifications$;
    }

    /**
     * Close notification by id
     */
    close(notification: Notification) {
        this.notificationService.close(notification);
    }
}
