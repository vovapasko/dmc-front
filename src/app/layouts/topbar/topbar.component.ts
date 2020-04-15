import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import {AuthenticationService} from '../../core/services/auth.service';
import {User} from '../../core/models/instances/user.models';
import {Notification} from '../../core/models/instances/notification';
import {NotificationService} from '../../core/services/notification.service';
import {UserService} from '../../core/services/user.service';
import {FormGroup} from '@angular/forms';
import {NewsService} from '../../core/services/news.service';
import {LoadingService} from '../../core/services/loading.service';
import {ErrorService} from '../../core/services/error.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Store} from "@ngrx/store";
import {IAppState} from "../../core/store/state/app.state";
import {CreateFormat, CreateHashtag} from "../../core/store/actions/news.actions";

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
    loading$: Subject<boolean>;
    error$: Subject<any>;

    openMobileMenu: boolean;
    submitted = false;

    createHashtagForm: FormGroup;
    createFormatForm: FormGroup;

    @Output() settingsButtonClicked = new EventEmitter();
    @Output() mobileMenuButtonClicked = new EventEmitter();

    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private userService: UserService,
        private http: HttpClient,
        private notificationService: NotificationService,
        private newsService: NewsService,
        private loadingService: LoadingService,
        private errorService: ErrorService,
        private modalService: NgbModal,
        private store: Store<IAppState>,
    ) {
    }

    ngOnInit() {
        this.initForms();
        this.initSubscriptions();
        this.openMobileMenu = false;
    }

    initSubscriptions() {
        this.loading$ = this.loadingService.loading$;
        this.error$ = this.errorService.error$;
        this.userService.currentUser();
        this.history$ = this.notificationService.history$;
        this.user$ = this.userService.user$;
    }

    initForms() {
        this.initCreateHashtagForm();
        this.initCreateFormatForm();
    }

    initCreateHashtagForm() {
        this.createHashtagForm = this.newsService.initializeCreateHashtagForm();
    }

    openModal(content: string) {
        this.modalService.open(content, {centered: true});
    }

    initCreateFormatForm() {
        this.createFormatForm = this.newsService.initializeCreateFormatForm();
    }

    submitCreateHashtagForm() {
        const ch = this.ch;
        const name = ch.name.value;
        const data = {name};
        this.submit(this.createHashtagForm, this.createHashtag.bind(this), {data});
    }

    submit(f: FormGroup, handler, payload) {
        this.submitted = true;
        if (f.invalid) {
            return;
        }
        handler(payload);
        this.submitted = false;
        f.reset();
        this.modalService.dismissAll();
    }

    createHashtag(payload) {
        this.store.dispatch(new CreateHashtag(payload));
    }

    submitCreateFormatForm() {
        const cf = this.cf;
        const postFormat = cf.postFormat.value;
        const data = {postFormat};
        this.submit(this.createFormatForm, this.createFormat.bind(this), {data});
    }

    createFormat(payload) {
        this.store.dispatch(new CreateFormat(payload));
    }

    // convenience getter for easy access to form fields
    get ch() {
        return this.createHashtagForm.controls;
    }

    // convenience getter for easy access to form fields
    get cf() {
        return this.createFormatForm.controls;
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
