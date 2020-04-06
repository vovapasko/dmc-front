import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../core/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {EmptyUser, User} from '../../core/models/instances/user.models';
import {Notification} from '../../core/models/instances/notification';
import {BehaviorSubject, Subscription} from 'rxjs';
import {NotificationService} from '../../core/services/notification.service';
import {UserService} from '../../core/services/user.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
    notifications$ = new BehaviorSubject<unknown>([]);
    user$: BehaviorSubject<User>;

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
        this.initSubscribes();
        this.openMobileMenu = false;
    }

    initSubscribes() {
        this.notifications$ = this.notificationService.notifications$;
        this.user$ = this.userService.user$;
    }

    /**
     * Remove notification from list
     */
    close(notification: Notification) {
        this.notificationService.close(notification);
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
        this.notificationService.notifications = [];
    }
}
