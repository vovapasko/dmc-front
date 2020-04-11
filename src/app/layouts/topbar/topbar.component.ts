import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import {AuthenticationService} from '../../core/services/auth.service';
import {User} from '../../core/models/instances/user.models';
import {Notification} from '../../core/models/instances/notification';
import {NotificationService} from '../../core/services/notification.service';
import {UserService} from '../../core/services/user.service';

/**
 * Top bar component - history, profile bar, logout and create new items
 */

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

    history$ = new BehaviorSubject<unknown>([]);
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
        this.initSubscriptions();
        this.openMobileMenu = false;
    }

    initSubscriptions() {
        this.userService.currentUser();
        this.history$ = this.notificationService.history$;
        this.user$ = this.userService.user$;
    }

    /**
     * Remove notification from list
     */
    close(notification: Notification) {
        this.notificationService.removeFromHistory(notification);
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
        this.notificationService.history = [];
    }
}
