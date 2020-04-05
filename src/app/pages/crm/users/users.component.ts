import {Component, OnDestroy, OnInit} from '@angular/core';

import {FormBuilder, Validators, FormGroup} from '@angular/forms';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Contacts} from './users.model';

import {AuthenticationService} from '../../../core/services/auth.service';
import {UserService} from '../../../core/services/user.service';
import {User} from '../../../core/models/instances/user.models';
import {select, Store} from "@ngrx/store";
import {IAppState} from "../../../core/store/state/app.state";
import {selectContractorList} from "../../../core/store/selectors/contractor.selectors";
import {selectUserList} from "../../../core/store/selectors/user.selectors";
import {GetContractors} from "../../../core/store/actions/contractor.actions";
import {GetUsers} from "../../../core/store/actions/user.actions";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})

/**
 * Users component - handling the users with sidebar and content
 */
export class UsersComponent implements OnInit {
    breadCrumbItems: Array<{}>;
    selectedRole = '';
    selectedUser: User;
    submitted: boolean;
    term: any;
    selectValue: string[];
    validationform: FormGroup;
    users$ = this.store.pipe(select(selectUserList));

    constructor(
        private modalService: NgbModal,
        private authService: AuthenticationService,
        private userService: UserService,
        private store: Store<IAppState>
    ) {
    }

    ngOnInit() {
        // tslint:disable-next-line: max-line-length
        this.breadCrumbItems = [{label: 'UBold', path: '/'}, {label: 'CRM', path: '/'}, {
            label: 'Contacts',
            path: '/',
            active: true
        }];

        this.initForm();

        this.initSelectOptions();

        // get users
        this._fetchData();
        this.store.dispatch(new GetUsers());
    }

    /**
     * Get current user and set available groups (Add new user)
     */
    initSelectOptions() {
        const currentUser = this.authService.currentUser();
        if (currentUser) {
            this.selectValue = currentUser.groupsCascadeDown;
        }
    }

    /**
     * Init form, create validators
     */
    initForm() {
        // Form validation TODO add async check email
        this.validationform = this.userService.initializeForm();
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
        this.selectedUser = user;
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
        this.userService.register({data});
    }

    /**
     * Get all users and subscribe to update
     */
    private _fetchData() {
        this.userService.getAll();
    }
}
