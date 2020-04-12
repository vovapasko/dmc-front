import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AuthenticationService} from '../../../core/services/auth.service';
import {UserService} from '../../../core/services/user.service';
import {User} from '../../../core/models/instances/user.models';
import {IAppState} from '../../../core/store/state/app.state';
import {selectUserList} from '../../../core/store/selectors/user.selectors';
import {CreateUser, DeleteUser, GetUsers, SelectUser, UpdateUser} from '../../../core/store/actions/user.actions';
import {PaginationService} from '../../../core/services/pagination.service';
import {LoadingService} from '../../../core/services/loading.service';
import {ErrorService} from '../../../core/services/error.service';
import {Groups} from '../../../core/models/instances/groups';
import {ServerError} from '../../../core/models/responses/serverError';

/**
 * Users component - handling the users with sidebar and content
 */

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

    breadCrumbItems: Array<{}>;

    loading$: Subject<boolean>;
    error$: Subject<any>;

    totalRecords$: BehaviorSubject<Array<User>> = new BehaviorSubject<Array<User>>([]);
    page$: BehaviorSubject<number> = new BehaviorSubject(1);
    pageSize$: BehaviorSubject<number> = new BehaviorSubject(10);

    selectedUser$: BehaviorSubject<User> = new BehaviorSubject(null);
    paginatedUserData$: BehaviorSubject<Array<User>> = new BehaviorSubject([]);
    currentUser: User;

    users$$ = this.store.pipe(select(selectUserList));

    selectedRole = '';
    submitted: boolean;
    term: any;
    selectValue: Groups[];
    validationform: FormGroup;

    constructor(
        private modalService: NgbModal,
        private authService: AuthenticationService,
        private userService: UserService,
        private store: Store<IAppState>,
        private paginationService: PaginationService,
        private loadingService: LoadingService,
        private errorService: ErrorService
    ) {
    }

    ngOnInit() {
        this.initBreadCrumbs();
        this.initForm();
        this.initSelectOptions();
        this.initSubscriptions();
    }

    initSubscriptions() {
        this.loading$ = this.loadingService.loading$;
        this.error$ = this.errorService.error$;

        this.selectedUser$ = this.userService.selectedUser$;
        this.paginatedUserData$ = this.userService.paginatedUserData$;

        this.totalRecords$ = this.paginationService.totalRecords$;
        this.page$ = this.paginationService.page$;
        this.pageSize$ = this.paginationService.pageSize$;

        this.currentUser = this.userService.currentUser();

        this.store.dispatch(new GetUsers());
    }

    initBreadCrumbs() {
        this.breadCrumbItems = [{label: 'Главная', path: '/'}, {
            label: 'Пользователи',
            path: '/contractors',
            active: true
        }];
    }

    /**
     * Get current user and set available groups (Add new user)
     */
    initSelectOptions() {
        const currentUser = this.userService.currentUser();
        if (currentUser) {
            this.selectValue = currentUser.groupsCascadeDown;
        }
    }

    /**
     * Init form, create validators
     */
    initForm() {
        this.validationform = this.userService.initializeInviteUserForm();
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.validationform.controls;
    }

    /**
     * Modal Open
     * @param content modal content
     */
    openModal(content: string) {
        this.modalService.open(content, {centered: true});
    }

    /**
     * Select user to show details
     */
    selectUser(user: User) {
        this.store.dispatch(new SelectUser(user));
    }

    /**
     * Invite new user with role and email
     */
    registerNewUser() {
        this.submitted = true;

        const email = this.validationform.get('email').value;
        const group = this.selectedRole;
        const data = {email, group};

        this.register(data);
    }

    register(data) {
        this.store.dispatch(new CreateUser({data}));
    }

    onPageChange(page) {
        this.userService.onPageChange(page);
    }

    delete(user: User) {
        this.store.dispatch(new DeleteUser(user));
    }

    updateGroup(user: User, group: Groups) {
        const data = {group};
        this.store.dispatch(new UpdateUser({id: user.id, data}));
    }
}
