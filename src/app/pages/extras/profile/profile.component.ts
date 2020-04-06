import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';

import {EmptyUser, User} from '../../../core/models/instances/user.models';
import {AuthenticationService} from '../../../core/services/auth.service';
import {UserService} from '../../../core/services/user.service';
import {LoadingService} from '../../../core/services/loading.service';
import {ErrorService} from '../../../core/services/error.service';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

/**
 * Profile component - handling the profile with sidebar and content
 */
export class ProfileComponent implements OnInit {
    loading$: Subject<boolean>;
    error$: Subject<boolean>;
    user$: Subject<User>;

    title = 'Профиль';
    currentUser: User = EmptyUser;
    profileForm: FormGroup;
    submitted = false;
    avatar: File = null;

    constructor(
        private authService: AuthenticationService,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private titleService: Title,
        private loadingService: LoadingService,
        private errorService: ErrorService
    ) {
    }

    ngOnInit() {
        this.initSubscribes();
        this.initForm();
    }

    initSubscribes() {
        this.error$ = this.errorService.error$;
        this.loading$ = this.loadingService.loading$;
        this.user$ = this.userService.user$;
    }

    /**
     * Init form with validators
     */
    initForm() {
        // creates form and validations
        this.profileForm = this.userService.initializeProfileForm();
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
        // stop here if form is invalid
        if (this.profileForm.invalid) {
            return;
        }
        this.submit();
    }

    submit() {
        const {firstName, lastName} = this.profileForm.value;
        const avatar = this.avatar;
        const formData = new FormData();
        formData.append('avatar', avatar);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        this.update(formData);
    }


    /**
     * Upload new image to cropper
     */
    handleFileInput(files: FileList) {
        this.avatar = files.item(0);
    }


    /**
     * Update profile and set new values
     */
    update(data) {
        this.userService.updateProfile({data});
    }

    /**
     * Send email with link for change password
     */
    changePassword() {
        this.userService.resetPassword();
    }
}
