import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Notification, NotificationType} from '../models/instances/notification';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor() { }

    private idx = 0;
    private notification$ = new BehaviorSubject({});

    public notifications$ = new BehaviorSubject([]);
    public history$ = new BehaviorSubject([]);

    get notifications() {
        return this.notifications$.getValue();
    }

    set notifications(value: Array<Notification>) {
        this.notifications$.next(value);
    }

    get history() {
        return this.history$.getValue();
    }

    set history(value: Array<Notification>) {
        this.history$.next(value);
    }

    /**
     * Returns nothing.
     * Invoke notification.
     * @param type one of NotificationType = [info, success, warning, error].
     * @param title title of message
     * @param message details of notification
     * @param timeout ms
     */
    notify(type: NotificationType, title: string, message: string, timeout = 1000): void {
        const notifications = this.notifications;
        const history = this.history;
        const notification = new Notification(this.idx++, type, title, message, timeout);
        notifications.push(notification);
        history.push(notification);
        this.notification$.next(notification);
        if (notification.timeout !== 0) {
            setTimeout(() => this.close(notification), notification.timeout);
        }
    }

    removeFromHistory(notification) {
        const history = this.history;
        this.history = history.filter(el => el.id !== notification.id);
    }

    /**
     * Close notification by id
     */
    close(notification: Notification) {
        this.notifications = this.notifications.filter(notif => notif.id !== notification.id);
    }
}
