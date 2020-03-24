import {Component, OnInit} from '@angular/core';

import {Project, Inbox} from './profile.model';

import {projectData, inboxData} from './data';
import {User} from '../../../core/models/instances/user.models';
import {AuthenticationService} from '../../../core/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../core/services/user.service';
import {environment} from '../../../../environments/environment';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

/**
 * Profile component - handling the profile with sidebar and content
 */
export class ProfileComponent implements OnInit {

    title = 'Профиль';
    error;
    api = environment.api;
    currentUser: User;
    profileForm: FormGroup;
    submitted = false;
    loading = false;

    // bread crumb items
    breadCrumbItems: Array<{}>;

    // Projects table
    projectData: Project[];

    inboxData: Inbox[];

    constructor(
        private authService: AuthenticationService,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private titleService: Title
    ) {
    }

    ngOnInit() {
        this.breadCrumbItems = [{label: 'UBold', path: '/'}, {label: 'Extras', path: '/'}, {label: 'Profile', path: '/', active: true}];

        // fetches current user
        this.currentUser = this.authService.currentUser();

        // creates form and validations
        this.profileForm = this.formBuilder.group({
            firstName: [this.currentUser.first_name, [Validators.required]],
            lastName: [this.currentUser.last_name, [Validators.required]],
            email: [this.currentUser.email, [Validators.required, Validators.email]],
        });

        // fetch emails
        this._fetchData();
    }

    /**
     * Set page title
     */
    public setTitle(title: string) {
        this.titleService.setTitle(title);
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.profileForm.controls;
    }

    /**
     * Update profile and set new values
     */
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.profileForm.invalid) {
            return;
        }

        this.loading = true;
        const {firstName, lastName} = this.profileForm.value;
        const data = {first_name: firstName, last_name: lastName};

        this.userService
            .updateProfile({data})
            .subscribe(
                user => {
                    this.loading = false;
                    this.f.firstName.setValue(user.first_name);
                    this.f.lastName.setValue(user.last_name);
                }
            );
    }

    /**
     * Send email with link for change password
     */
    changePassword() {
        this.loading = true;

        this.userService
            .resetPassword()
            .subscribe(
                response => {
                    this.error = null;
                    this.loading = false;
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }

    /**
     * fetches the profile value
     */
    private _fetchData() {
        this.projectData = projectData;

        this.inboxData = inboxData;
    }
}
