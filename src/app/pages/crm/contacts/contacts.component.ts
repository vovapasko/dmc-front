import {Component, OnDestroy, OnInit} from '@angular/core';

import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Contacts} from './contacts.model';

import {contactData} from './data';
import {AuthenticationService} from '../../../core/services/auth.service';
import {UserService} from '../../../core/services/user.service';
import {User} from '../../../core/models/instances/user.models';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
})

/**
 * Contacts component - handling the contacts with sidebar and content
 */
export class ContactsComponent implements OnInit, OnDestroy {
    // bread crumb items
    sub;
    loading = false;
    selectedUser: User = {
        id: null,
        email: null
    };
    error;
    api = environment.api;
    breadCrumbItems: Array<{}>;
    selectedRole = '';
    submitted: boolean;
    term: any;
    // page number
    page = 1;
    // default page size
    pageSize = 10;

    // start and end index
    startIndex = 1;
    endIndex = 10;
    totalSize = 0;
    selectValue: string[];
    users: User[] = [];

    paginatedUserData: Array<User>;
    // validation form
    validationform: FormGroup;

    constructor(
        private modalService: NgbModal,
        public formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        // tslint:disable-next-line: max-line-length
        this.breadCrumbItems = [{label: 'UBold', path: '/'}, {label: 'CRM', path: '/'}, {label: 'Contacts', path: '/', active: true}];

        // Form validation TODO add async check email
        this.validationform = this.formBuilder.group({
            email: [
                '',
                [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],
                [this.isEmailUnique.bind(this), this.isEmailValid.bind(this)]
            ],
        });

        // Get current user and set available groups (Add new user)
        const currentUser = this.authService.currentUser();
        this.selectValue = currentUser.groups_cascade_down;

        // get users
        this._fetchData();
    }

    isEmailUnique(control: FormControl) {
        const data = {email: control.value};
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.userService.isEmailRegisterd({data}).subscribe(() => {
                    resolve(null);
                }, () => {
                    resolve({isEmailUnique: true});
                });
            }, 1000);
        });
    }

    isEmailValid(control: FormControl) {
        const data = {email: control.value};
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.userService.isEmailValid({data}).subscribe(() => {
                    resolve(null);
                }, () => {
                    resolve({isEmailValid: true});
                });
            }, 1000);
        });
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
     * Close all modals (configure and add new user)
     */
    closeModal() {
        this.modalService.dismissAll();
    }

    /**
     * Invite new user with role and email
     */
    registerNewUser() {
        this.loading = true;

        const email = this.validationform.get('email').value;
        const group = this.selectedRole;
        const data = {email, group};

        this.register(data);
    }

    register(data) {
        this.userService
            .register({data})
            .subscribe(
                response => {

                    // reset loading and error
                    this.error = null;
                    this.loading = false;

                    // clear input values
                    this.f.email.setValue('');
                    this.selectedRole = '';

                    // update users list
                    this._fetchData();
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }

    /**
     * Pagination onpage change
     * @param page show the page
     */
    onPageChange(page: any): void {
        this.startIndex = (page - 1) * this.pageSize;
        this.endIndex = (page - 1) * this.pageSize + this.pageSize;
        this.paginatedUserData = this.users.slice(this.startIndex, this.endIndex);
    }

    /**
     * Get all users and subscribe to update
     */
    private _fetchData() {
        this.sub = this.userService.getAll().subscribe(
            response => {

                // set users
                this.users = response;

                // apply pagination
                this.applyPagination();

                // set default selected user
                if (this.users.length) {
                    this.selectedUser = this.users[0];
                }
            },
            error => console.log(error)
        );
    }

    /**
     * Apply pagination
     */
    applyPagination() {
        this.startIndex = 0;
        this.endIndex = this.pageSize;
        this.paginatedUserData = this.users.slice(this.startIndex, this.endIndex);
        this.totalSize = this.users.length;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
