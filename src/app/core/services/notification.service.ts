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
    public notification$ = new BehaviorSubject(null);
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

    get notification() {
        return this.notification$.getValue();
    }

    set notification(notification: Notification) {
        this.notification$.next(notification);
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
        const notification = new Notification(this.idx++, type, title, message, timeout);
        this.registerNotification(notification);
        this.trackTime(notification);
    }

    registerNotification(notification) {
        const notifications = this.notifications;
        const history = this.history;
        notifications.push(notification);
        history.push(notification);

        this.notification = notification;
        this.notifications = notifications;
        this.history = history;
    }

    trackTime(notification) {
        if (notification.timeout !== 0) {
            return setTimeout(() => this.close(notification), notification.timeout);
        }
    }

    /**
     * Remove notification from history bar
     */
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
