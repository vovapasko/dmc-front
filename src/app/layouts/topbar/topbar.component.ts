import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../core/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../../core/models/instances/user.models';
import {Notification} from '../../core/models/instances/notification';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../core/services/notification.service';
import {UserService} from '../../core/services/user.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {

    notifications: Notification[] = [];
    private notificationSubscription: Subscription;
    private userSubscription: Subscription;
    api = environment.api;
    currentUser: User;
    openMobileMenu: boolean;

    @Output() settingsButtonClicked = new EventEmitter();
    @Output() mobileMenuButtonClicked = new EventEmitter();

    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private userService: UserService,
        private http: HttpClient,
        private notificationService: NotificationService
    ) {
    }

    ngOnInit() {
        // get the notifications
        this.notificationSubscription = this.notificationService
            .getObservable()
            .subscribe(
                notification => this.addNotification(notification)
            );
        // get the user updates
        this.userSubscription = this.userService
            .getObservable()
            .subscribe(
                user => this.setUser(user)
            );

        // set current user
        const currentUser = this.authService.currentUser();
        this.setUser(currentUser);

        this.openMobileMenu = false;
    }

    /**
     * Set current user
     */
    setUser(user) {
        this.currentUser = user;
    }

    /**
     * Add new notification to bar and detect if something happens with user
     */
    addNotification(notification: Notification) {
        this.notifications.push(notification);
    }

    /**
     * Remove notification from list
     */
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

    /**
     * Remove all notifications
     */
    clearAll() {
        this.notifications = [];
    }

    /**
     * Unsubscribe from all subscriptions
     */
    ngOnDestroy() {
        this.userSubscription.unsubscribe();
        this.notificationSubscription.unsubscribe();
    }
}
