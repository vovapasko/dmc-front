import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Notification, NotificationType } from '../models/instances/notification';

@Injectable()
export class NotificationService {

    private subject = new Subject<Notification>();
    private idx = 0;

    constructor() { }

    /**
     * Returns observable for subscribe
     */
    getObservable(): Observable<Notification> {
        return this.subject.asObservable();
    }

    /**
     * Info notification, blue background
     */
    info(title: string, message: string, timeout = 3000) {
        this.subject.next(new Notification(this.idx++, NotificationType.info, title, message, timeout));
    }

    /**
     * Success notification, green background
     */
    success(title: string, message: string, timeout = 3000) {
        this.subject.next(new Notification(this.idx++, NotificationType.success, title, message, timeout));
    }

    /**
     * Warning notification, yellow background
     */
    warning(title: string, message: string, timeout = 3000) {
        this.subject.next(new Notification(this.idx++, NotificationType.warning, title, message, timeout));
    }

    /**
     * Error notification, red background
     */
    error(title: string, message: string, timeout = 3000) {
        this.subject.next(new Notification(this.idx++, NotificationType.error, title, message, timeout));
    }

}
