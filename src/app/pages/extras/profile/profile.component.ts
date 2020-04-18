import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';

import {User} from '../../../core/models/instances/user.models';
import {AuthenticationService} from '../../../core/services/auth.service';
import {UserService} from '../../../core/services/user.service';
import {LoadingService} from '../../../core/services/loading.service';
import {ErrorService} from '../../../core/services/error.service';
import {ResetPassword, UpdateProfile} from '../../../core/store/actions/user.actions';
import {IAppState} from '../../../core/store/state/app.state';
import {NotificationService} from '../../../core/services/notification.service';
import {NotificationType} from '../../../core/models/instances/notification';
import {ServerError} from '../../../core/models/responses/serverError';


/**
 * Profile component - handling the profile with sidebar and content
 */

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    breadCrumbItems: Array<{}>;

    loading$: Subject<boolean>;
    error$: Subject<any>;
    user$: Subject<User>;

    title = 'Профиль';
    profileForm: FormGroup;
    submitted = false;
    avatar: FileList = null;
    avatarBase64 = '';

    constructor(
        private authService: AuthenticationService,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private titleService: Title,
        private loadingService: LoadingService,
        private errorService: ErrorService,
        private store: Store<IAppState>,
        private notificationService: NotificationService
    ) {
    }

    ngOnInit() {
        this.initSubscriptions();
        this.initForm();
        this.initBreadCrumbs();
        this.setTitle(this.title);
    }

    initSubscriptions() {
        this.userService.currentUser();
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

    initBreadCrumbs() {
        this.breadCrumbItems = [{label: 'Главная', path: '/'}, {
            label: 'Профиль',
            path: '/profile',
            active: true
        }];
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
        if (avatar) {
            formData.append('avatar', avatar[0]);
        }
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        this.update(formData);
    }


    /**
     * Upload new image to cropper
     */
    onFileChanges(files) {
        this.avatarBase64 = files[0].base64;
        this.notificationService.notify(NotificationType.info, 'Изображение было загружено', 'Нажмите сохранить чтобы увидеть изменения');
    }


    /**
     * Update profile and set new values
     */
    update(data) {
        this.store.dispatch(new UpdateProfile({data}));
    }

    /**
     * Send email with link for change password
     */
    changePassword() {
        this.store.dispatch(new ResetPassword());
    }
}
