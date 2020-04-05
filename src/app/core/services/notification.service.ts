import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {Notification, NotificationType} from '../models/instances/notification';

@Injectable()
export class NotificationService {

    private subject = new Subject<Notification>();
    private idx = 0;

    constructor() {
    }

    /**
     * Returns observable for subscribe
     */
    getObservable(): Observable<Notification> {
        return this.subject.asObservable();
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
        this.subject.next(new Notification(this.idx++, type, title, message, timeout));
    }
}
