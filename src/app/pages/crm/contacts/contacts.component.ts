import {Component, OnInit} from '@angular/core';

import {FormBuilder, Validators, FormGroup} from '@angular/forms';

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
export class ContactsComponent implements OnInit {
    // bread crumb items
    sub;
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
        this.validationform = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        });

        const currentUser = this.authService.currentUser();
        this.selectValue = currentUser.groups_cascade_down;

        this.sub = this.userService.getAll().subscribe(
            response => this._fetchData(response),
            error => console.log(error)
        );
        /**
         * Fetches Data
         */

    }

    /**
     * Returns form
     */
    get form() {
        return this.validationform.controls;
    }

    /**
     * Modal Open
     * @param content modal content
     */
    openModal(content: string) {
        this.modalService.open(content, {centered: true});
    }

    closeModal() {
        this.modalService.dismissAll();
    }

    /**
     * save the contacts data
     */
    saveData() {
        const email = this.validationform.get('email').value;
        const group = this.selectedRole;
        const data = {email, group};
        this.userService
            .register({data})
            .subscribe(
                response => {
                    // TODO add notification
                    this.closeModal();
                },
                error => {
                    // TODO add notification
                    console.log(error);
                    this.closeModal();
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

    private _fetchData(users: User[]) {

        this.users = users;
        // apply pagination
        this.startIndex = 0;
        this.endIndex = this.pageSize;

        this.paginatedUserData = this.users.slice(this.startIndex, this.endIndex);
        this.totalSize = this.users.length;
    }
}
