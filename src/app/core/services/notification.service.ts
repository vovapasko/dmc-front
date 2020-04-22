import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {Notification, NotificationType} from '../models/instances/notification';

/**
 * This service for store and handle notifications
 */

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private idx = 0;
    public notifications$ = new BehaviorSubject([]);
    public history$ = new BehaviorSubject([]);

    constructor() {
    }

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
    public notify(type: NotificationType, title: string, message: string, timeout = 1000): void {
        const notification = new Notification(this.idx++, type, title, message, timeout);
        this.registerNotification(notification);
        this.trackTime(notification);
    }

    private registerNotification(notification: Notification): void {
        this.notifications.push(notification);
        this.history.push(notification);
    }

    private trackTime(notification: Notification): void {
        if (notification.timeout !== 0) {
            setTimeout(() => this.close(notification), notification.timeout);
        }
    }

    /**
     * Remove notification from history bar
     */
    public removeFromHistory(notification): void {
        const history = this.history;
        this.history = history.filter(el => el.id !== notification.id);
    }

    /**
     * Close notification by id
     */
    public close(notification: Notification): void {
        this.notifications = this.notifications.filter(notif => notif.id !== notification.id);
    }
}
