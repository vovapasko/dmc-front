import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';

import {User} from '../../../core/models/instances/user.models';
import {AuthenticationService} from '../../../core/services/auth.service';
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

    title = 'Профиль';
    error;
    api = environment.api;
    currentUser: User;
    profileForm: FormGroup;
    submitted = false;
    loading = false;

    constructor(
        private authService: AuthenticationService,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private titleService: Title
    ) {
    }

    ngOnInit() {
        // fetches current user
        this.currentUser = this.authService.currentUser();

        this.initForm();
    }

    /**
     * Init form with validators
     */
    initForm() {
        // creates form and validations
        this.profileForm = this.formBuilder.group({
            firstName: [this.currentUser.first_name, [Validators.required]],
            lastName: [this.currentUser.last_name, [Validators.required]],
            email: [this.currentUser.email, [Validators.required, Validators.email]],
        });
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
     * Collects data and calls update method
     */
    onSubmit() {

        this.submitted = true;
        this.loading = true;

        // stop here if form is invalid
        if (this.profileForm.invalid) {
            return;

        }
        const {firstName, lastName} = this.profileForm.value;
        const data = {first_name: firstName, last_name: lastName};

        this.update(data);
    }


    /**
     * Update profile and set new values
     */
    update(data) {
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
}
