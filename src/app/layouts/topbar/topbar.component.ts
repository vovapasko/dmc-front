import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../core/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../../core/models/instances/user.models';
import {Notification, NotificationType} from '../../core/models/instances/notification';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../core/services/notification.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {

    notifications: Notification[] = [];
    private subscription: Subscription;
    api = environment.api;
    currentUser: User;
    languages: Array<{
        id: number,
        flag?: string,
        name: string
    }>;
    openMobileMenu: boolean;

    @Output() settingsButtonClicked = new EventEmitter();
    @Output() mobileMenuButtonClicked = new EventEmitter();

    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private http: HttpClient,
        private notificationService: NotificationService
    ) {
    }

    ngOnInit() {
        // get the notifications
        this.subscription = this.notificationService.getObservable().subscribe(notification => this._addNotification(notification));

        this.currentUser = this.authService.currentUser();
        this.openMobileMenu = false;
    }

    private _addNotification(notification: Notification) {
        this.notifications.push(notification);
    }

    emit() {
        this.notificationService.success('Good job', 'Hello');
    }

    close(notification: Notification) {
        this.notifications = this.notifications.filter(notif => notif.id !== notification.id);
    }

    /**
     * Toggles the right sidebar
     */
    toggleRightSidebar() {
        this.settingsButtonClicked.emit();
    }

    /**
     * Toggle the menu bar when having mobile screen
     */
    toggleMobileMenu(event: any) {
        event.preventDefault();
        this.mobileMenuButtonClicked.emit();
    }

    /**
     * Logout the user
     */
    logout() {
        this.authService.logout();
        this.router.navigate(['/account/login']);
    }

    clearAll() {
        this.notifications = [];
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
