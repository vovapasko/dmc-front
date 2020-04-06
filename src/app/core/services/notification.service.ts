import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Notification, NotificationType} from '../models/instances/notification';

@Injectable()
export class NotificationService {

    private notification$ = new BehaviorSubject({});
    private idx = 0;

    public notifications$ = new BehaviorSubject([]);

    get notifications() {
        return this.notifications$.getValue();
    }

    set notifications(value: Array<any>) {
        this.notifications$.next(value);
    }

    /**
     * Returns nothing.
     * Invoke notification.
     * @param type one of NotificationType = [info, success, warning, error].
     * @param title title of message
     * @param message details of notification
     * @param timeout ms
     */
    notify(type: NotificationType, title: string, message: string, timeout = 3000): void {
        const notifications = this.notifications;
        const notification = new Notification(this.idx++, type, title, message, timeout);
        notifications.push(notification);
        this.notification$.next(notification);

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
}
