import {Component, OnInit} from '@angular/core';

import {Project, Inbox} from './profile.model';

import {projectData, inboxData} from './data';
import {User} from '../../../core/models/instances/user.models';
import {AuthenticationService} from '../../../core/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../core/services/user.service';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

/**
 * Profile component - handling the profile with sidebar and content
 */
export class ProfileComponent implements OnInit {

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

    constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private userService: UserService) {
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
                    this.f.firstName.setValue(user.first_name);
                    this.f.lastName.setValue(user.last_name);
                }
            );
    }

    /**
     * Send email with link for change password
     */
    changePassword() {
        this.userService
            .resetPassword()
            .subscribe(
                response => alert('check your email pls'),
                error => console.log(error)
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
